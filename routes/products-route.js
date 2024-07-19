const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');

const { productCreateValidator } = require("../validators/ProductValidator");

const productsController = require('../controllers/ProductsController');


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
router.post('/', authMiddleware, productCreateValidator, productsController.create);

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
router.put('/', authMiddleware, productsController.update);

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
router.delete('/', authMiddleware, productsController.delete);

module.exports = router;