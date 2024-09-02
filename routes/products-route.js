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
 * components:
 *  schemas:
 *      use_active_filter:
 *          type: boolean
 *          enum:
 *              - true
 *              - false
 *      use_date_filter:
 *          type: string
 *          enum:
 *              - create_at
 *              - update_at
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products data
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema: 
 *          type: integer
 *        description: id product
 *      - in: query
 *        name: sku
 *        schema:
 *          type: string
 *        description: sku product
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: product nammme
 *      - in: query
 *        name: brand_id
 *        schema:
 *          type: integer
 *        description: brand id 
 *      - in: query
 *        name: active
 *        schema:
 *          type: boolean
 *          enum: [true, false]
 *        description: status active or not active from product
 *      - in: query
 *        name: filter_by
 *        schema:
 *          $ref: '#/components/schemas/use_date_filter'
 *        required: false
 *        description: >
 *          * use the selector to filter by creation date, update date, deletion date.
 *          * 'creation_date' - creation date, filter row for creation date
 *          * 'update_date' - Update date, filter row for update date
 *          * 'deletion_date' - Deletion date, filter row for deletion date.
 *      - in: query
 *        name: start_date
 *        scheme:
 *          type: string
 *          format: date
 *        required: false
 *        description: Filter by the start date (yyyy-MM-dd )
 *      - in: query
 *        name: end_date
 *        scheme:
 *          type: string
 *          format: date
 *        required: false
 *        description: Filter by the end date (yyyy-MM-dd ) * 
 *      - in: query
 *        name: user_id
 *        scheme:
 *          type: integer
 *        required: false
 *        description: user creation or last modified
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
 * /products/{id}:
 *   put:
 *     summary: Update product data
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        scheme: 
 *          type: integer
 *        description: product identificator 
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  properties:
 *                      sku:
 *                          type: string
 *                      name:
 *                          type: string
 *                      brand_id:
 *                          type: integer
 *                      active:
 *                          type: boolean
 *                          enum: [true, false]
 *                      images:
 *                          type: array
 *                          items:
 *                              type: string
 *                              format: binary
 *     responses:
 *       200:
 *         description: Update product
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, upload.array('images'), productUpdateValidator, productsController.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete product data
 *     tags: [Products]
 *     parameters:
 *      - in: path
 *        name: id
 *        scheme: 
 *          type: integer
 *        required: true
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


/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve products by id (Additional Method)
 *     tags: [Products]
 *     description: >
 *      This endpoint allows you to retrieve product filtered by their id **Additional Methods**.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id
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
router.get('/:id', authMiddleware, productsController.findById);

/**
 * @swagger
 * /products/{id}/enable:
 *  put:
 *      summary: active the product (Additional Method)
 *      tags: [Products]
 *      description: >
 *          active de product id **Additional Method**
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: product id
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 *          401: 
 *              description: access denied. Invalid token
 *          400:
 *              description: Bad request
 */
router.put('/:id/enable', authMiddleware, productsController.activate);

/**
 * @swagger
 * /products/{id}/disable:
 *  put:
 *      summary: deactivate the product (Additional Method)
 *      tags: [Products]
 *      description: >
 *          deactive product id **Additional Method**.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: product id
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 *          401: 
 *              description: access denied. Invalid token
 *          400:
 *              description: Bad request
 */
router.put('/:id/disable', authMiddleware, productsController.deactivate);


module.exports = router;