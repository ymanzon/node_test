const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const customersController = require('../controllers/CustomersController');
const { createValidator, updateValidator } = require('../validators/CustomerValidator');

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
 *        description: customer code
 *      - in: query
 *        name: firstname
 *        schema:
 *            type: string
 *        required: false
 *        description: customer fisrt name
 *      - in: query
 *        name: lastname
 *        schema:
 *            type: string
 *        required: false
 *        description: customer last name
 *      - in: query
 *        name: active
 *        schema:
 *          type: bolean
 *          enum: [true, false]
 *        required: false
 *        description: customer active status
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
 *        description: Filter by the end date (yyyy-MM-dd )
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
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  required:
 *                      - cust_code
 *                      - firstname
 *                      - lastname
 *                      - active
 *                  properties:
 *                      cust_code:
 *                          type: string
 *                          description: cust_code min 3 max 10
 *                          example: C000000001
 *                      firstname:
 *                          type: string
 *                          descrition: firstname of customer
 *                          example: Joe
 *                      lastname:
 *                          type: string
 *                          description: lastname of customer
 *                          example: Doe
 *                      active:
 *                          type: boolean
 *                          enum: [true, false]
 *                          example: true
 *                          description: active customer or inactive customer in true or false
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


/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: find customer by id (Additional Method)
 *     tags: [Customers]
 *     description: >
 *      retrive only customer id **Additional Method**
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: success
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/:id', authMiddleware, customersController.findById);


/**
 * @swagger
 * /customers/{id}/enable:
 *  put:
 *      summary: activate the customer (Additional Method)
 *      tags: [Customers]
 *      description: >
 *          deactive customer id **Additional Method**.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: customer id
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
router.put("/:id/enable", authMiddleware, customersController.activate)

/**
 * @swagger
 * /customers/{id}/disable:
 *  put:
 *      summary: deactivate the customer (Additional Method)
 *      tags: [Customers]
 *      description: >
 *          deactive customer id **Additional Method**.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: customer id
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
router.put("/:id/disable", authMiddleware, customersController.deactivate)





module.exports = router;