const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const inventoryController = require('../controllers/InventoryController');
const { inventoryValidator }  = require('../validators/InventoryValidator');


/**
 * @swagger
 * /inventory:
 *   post:
 *     summary: Generate inventory register
 *     tags: [Inventory]
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  required: 
 *                      - product_id
 *                      - quantity
 *                      - type_move
 *                  properties:
 *                      product_id:
 *                          type: integer
 *                          description: product
 *                      quantity:
 *                          type: number
 *                          format: decimal
 *                          description: quantity of product
 *                      type_move:
 *                          type: string
 *                          enum: [IN, OUT, ADJ]
 *                          description: >
 *                              IN.- records an entry of material to the inventory
 *                              OUT.- records an exit of material to the inventory
 *                              ADJ.- records an update to the wuantity inventory 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create inventory
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, inventoryValidator, inventoryController.create );


/**
 * @swagger 
 * /inventory:
 *  get:
 *      summary: get inventory results for products 
 *      tags: [Inventory]
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: integer
 *            required: false
 *            description: the id from inentory
 *          - in: query
 *            name: product_id
 *            schema: 
 *              type: integer
 *            required: false
 *            description: product id
 *          - in: query
 *            name: sku
 *            schema:
 *              type: string
 *            required: false
 *            description: product code sku
 *          - in: query
 *            name: active
 *            schema:
 *              type: boolean
 *            enum: [true, false]
 *            description: active or inactive inventary
 *          - in: query
 *            name: product_name
 *            schema:
 *              type: string
 *            required: false
 *            ddescription: product inventary name 
 *          - in: query
 *            name: brand_name
 *            schema:
 *              type: string
 *            required: false
 *            description: brand name for product
 *          - in: query
 *            name: create_at
 *            schema:
 *              type: date
 *            required: false
 *            description: filter by inventary create at(yyyy-MM-dd)
 *          - in: query
 *            name: start_create_at
 *            schema:
 *              type: string
 *              format: date
 *            required: false
 *            description: filter by start create inventory(yyyy-MM-dd)
 *          - in: query
 *            name: end_create_at
 *            schema:
 *              type: string
 *              format: date
 *            description: filter by the end inventory create at(yyyy-MM-dd)
 *            required: false
 *      secutiry:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 *          400:
 *              description: invalid token
 */
router.get('/', authMiddleware, inventoryController.filter );

/**
 * @swagger
 * /inventory/transactions:
 *  get:
 *      summary: get transactions product inventory 
 *      tags: [Inventory]
 *      parameters:
 *          - in: query
 *            name: id
 *            schema:
 *              type: integer
 *            required: false
 *            description: transaction id
 *          - in: query
 *            name: product_id
 *            schema:
 *                type: integer
 *            required: false
 *            description: product transactions filter
 *          - in: query
 *            name: sku
 *            schema:
 *              type: string
 *            required: false
 *            description: sku product
 *          - in: query
 *            name: product_name
 *            schema:
 *              type: string
 *            required: false
 *            descripton: product   transaction 
 *          - in: query
 *            name: brand_id
 *            schema:
 *              type: integer
 *            description: brand id 
 *          - in: query
 *            name: brand_name
 *            schema:
 *              type: string
 *            description: brand name transaction
 *          - in: query
 *            name: type_move
 *            schema:
 *              type: string
 *              enum: [IN, OUT, ADJ]
 *            description: type move options
 *          - in: query
 *            name: active
 *            schema:
 *              type: boolean
 *            description: descripcion active transaction
 *          - in: query
 *            name: create_at
 *            schema:
 *              type: date
 *            description: transaction create date
 *          - in: query
 *            name: start_create_at
 *            schema: 
 *              type: date
 *            description: transaction create date start
 *          - in: query
 *            name: end_create_at
 *            schema: 
 *              type: date
 *            description: transaction create date end
 *      security:
 *          - bearerAuth: []
 *      responses:
 *          200:
 *              description: success
 *          401:
 *              description: access denied.
 * 
 */
router.get('/transactions', authMiddleware, inventoryController.getTransactions);

module.exports = router;