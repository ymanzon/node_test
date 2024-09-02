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
 *            name: filter_by
 *            schema:
 *              $ref: '#/components/schemas/use_date_filter'
 *            required: false
 *            description: >
 *              * use the selector to filter by creation date, update date, deletion date.
 *              * 'creation_date' - creation date, filter row for creation date
 *              * 'update_date' - Update date, filter row for update date
 *              * 'deletion_date' - Deletion date, filter row for deletion date.
 *          - in: query
 *            name: start_date
 *            scheme:
 *              type: string
 *              format: date
 *            required: false
 *            description: Filter by the start date (yyyy-MM-dd )
 *          - in: query
 *            name: end_date
 *            scheme:
 *              type: string
 *              format: date
 *            required: false
 *            description: Filter by the end date (yyyy-MM-dd )
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
 *            name: type_move
 *            schema:
 *              type: string
 *              enum: [IN, OUT]
 *            description: type move options
 *          - in: query
 *            name: active
 *            schema:
 *              type: boolean
 *            description: descripcion active transaction
 *          - in: query
 *            name: filter_by
 *            schema:
 *              $ref: '#/components/schemas/use_date_filter'
 *            required: false
 *            description: >
 *              * use the selector to filter by creation date, update date, deletion date.
 *              * 'creation_date' - creation date, filter row for creation date
 *              * 'update_date' - Update date, filter row for update date
 *              * 'deletion_date' - Deletion date, filter row for deletion date.
 *          - in: query
 *            name: start_date
 *            scheme:
 *              type: string
 *              format: date
 *            required: false
 *            description: Filter by the start date (yyyy-MM-dd )
 *          - in: query
 *            name: end_date
 *            scheme:
 *              type: string
 *              format: date
 *            required: false
 *            description: Filter by the end date (yyyy-MM-dd )
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