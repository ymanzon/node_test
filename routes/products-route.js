const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');

const { productCreateValidator, productUpdateValidator } = require("../validators/ProductValidator");

const productsController = require('../controllers/ProductsController');

const multer = require('multer');
const storage = require('../middlewares/StorageMiddleware');
const upload = multer({ storage: storage });

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products data
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Products data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/', authMiddleware, productsController.filter);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create product data
 *     tags: [Products]
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required:
 *                      - sku
 *                      - name
 *                      - brand_id
 *                      - active
 *                  properties:
 *                      sku:
 *                          type: string
 *                          description: product sku
 *                          example: XPS0001
 *                      name:
 *                          type: string
 *                          description: product name
 *                          example: LAP DELL XPS15
 *                      brand_id:
 *                          type: integer
 *                          description: brand id
 *                      active:
 *                          type: boolean
 *                          description: active or inactive product
 *                          enum: [true, false]
 *                      images:
 *                          type: array 
 *                          description: images list for products 
 *                          items:
 *                              type: string
 *                              format: binary
 *                              description: image product image
 *                                  
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create product
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, upload.array('images') , productCreateValidator, productsController.create);

/**
 * @swagger
 * /products:
 *   put:
 *     summary: Update product data
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update product
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, productUpdateValidator, productsController.update);

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete product data
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete product
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.delete('/:id', authMiddleware, productsController.delete);

module.exports = router;