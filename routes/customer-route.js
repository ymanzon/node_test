const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const customersController = require('../controllers/CustomersController');
const { createValidator, updateValidator } = require('../validators/CustomerValidator');

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get brand data
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: cust_code
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: firstname
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: lastname
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
router.get('/', authMiddleware, customersController.filter);

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create customer data
 *     tags: [Customers]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      cust_code:
 *                          type: string
 *                      firstname:
 *                          type: string
 *                      lastname:
 *                          type: string
 *                      active:
 *                          type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create customer
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, createValidator, customersController.create);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update customer data
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     cust_code:
 *                      type: string
 *                     firstname:
 *                      type: string
 *                     lastname:
 *                      type: string
 *                     active:
 *                      type: boolean
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update customer
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, updateValidator, customersController.update);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete customer data
 *     tags: [Customers]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *       required: true
 *       description: The id reference for customer deletes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete customer
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.delete('/:id', authMiddleware, customersController.delete);

module.exports = router;