const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const salesOrdersController = require('../controllers/SalesOrdersController');
const { createValidator }  = require('../validators/SalesOrdersValidators');

/**
 * @swagger
 * /sales-orders:
 *   get:
 *     summary: Get brand data
 *     tags: [Sales orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *            type: integer
 *        required: false
 *      - in: query
 *        name: legal_number
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: customer_id
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: active
 *        schema:
 *          type: bolean
 *        required: false
 *     responses:
 *       200:
 *         description: Customer data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/', authMiddleware, salesOrdersController.filter);


//post
/**
 * @swagger
 * /sales-orders:
 *   post:
 *     summary: Create a new sales order
 *     tags: [Sales orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               legal_number:
 *                 type: string
 *                 description: Legal number of the sales order
 *                 example: SO-12345
 *               customer_id:
 *                 type: integer
 *                 description: ID of the customer associated with the sales order
 *                 example: 789
 *               subtotal:
 *                 type: number
 *                 format: decimal
 *                 description: Subtotal amount of the sales order
 *                 example: 100.50
 *               total:
 *                 type: number
 *                 format: decimal
 *                 description: Total amount of the sales order
 *                 example: 120.60
 *               active:
 *                 type: boolean
 *                 description: Active status of the sales order
 *                 example: true
 *               details:
 *                 type: array
 *                 description: Details of the sales order
 *                 items:
 *                   type: object
 *                   properties:
 *                     product_id:
 *                       type: integer
 *                       description: Product ID associated with this detail
 *                       example: 456
 *                     quantity:
 *                       type: number
 *                       format: decimal
 *                       description: Quantity of the product in the order
 *                       example: 2
 *                     unit_price:
 *                       type: number
 *                       format: decimal
 *                       description: Unit price of the product
 *                       example: 50.25
 *                     total:
 *                       type: number
 *                       format: decimal
 *                       description: Total price for this order detail
 *                       example: 100.50
 *     responses:
 *       201:
 *         description: Sales order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the newly created sales order
 *                   example: 1
 *                 legal_number:
 *                   type: string
 *                   description: Legal number of the sales order
 *                   example: SO-12345
 *                 customer_id:
 *                   type: integer
 *                   description: ID of the customer associated with the sales order
 *                   example: 789
 *                 subtotal:
 *                   type: number
 *                   format: decimal
 *                   description: Subtotal amount of the sales order
 *                   example: 100.50
 *                 total:
 *                   type: number
 *                   format: decimal
 *                   description: Total amount of the sales order
 *                   example: 120.60
 *                 active:
 *                   type: boolean
 *                   description: Active status of the sales order
 *                   example: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the sales order was created
 *                   example: "2023-08-18T12:34:56Z"
 *                 details:
 *                   type: array
 *                   description: Details of the sales order
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Sales order detail ID
 *                         example: 1
 *                       product_id:
 *                         type: integer
 *                         description: Product ID associated with this detail
 *                         example: 456
 *                       quantity:
 *                         type: number
 *                         format: decimal
 *                         description: Quantity of the product in the order
 *                         example: 2
 *                       unit_price:
 *                         type: number
 *                         format: decimal
 *                         description: Unit price of the product
 *                         example: 50.25
 *                       total:
 *                         type: number
 *                         format: decimal
 *                         description: Total price for this order detail
 *                         example: 100.50
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       401:
 *         description: Access denied. No token provided.
 */
router.post('/', authMiddleware, createValidator, salesOrdersController.create);


module.exports = router;