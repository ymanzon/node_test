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
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      product_id:
 *                          type: integer
 *                      quantity:
 *                          type: number
 *                      type_move:
 *                          type: string
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

module.exports = router;