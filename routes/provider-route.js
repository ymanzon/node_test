const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const providerController = require('../controllers/ProviderController');
const { createValidator, updateValidator } = require('../validators/ProviderValidator');

/**
 * @swagger
 * /providers:
 *   get:
 *     summary: Get provider data
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: prov_code
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
 *      - in: query
 *        name: create_at
 *        schema:
 *          type: date
 *      - in: query
 *        name: start_create_at
 *        schema: 
 *          type: date
 *      - in: query
 *        name: end_create_at
 *        schema:
 *          type: date
 *     responses:
 *       200:
 *         description: Provider data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/', authMiddleware, providerController.filter);

/**
 * @swagger
 * /providers:
 *   post:
 *     summary: Create provider data
 *     tags: [Providers]
 *     requestBody:
 *      required: true
 *      content:
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  required:
 *                      - prov_code
 *                      - firstname
 *                      - lastname
 *                      - active
 *                  properties:
 *                      prov_code:
 *                          type: string
 *                          description: provider code
 *                          example: PROV001
 *                      firstname:
 *                          type: string
 *                          description: provider first name
 *                          example: Jonh
 *                      lastname:
 *                          type: string
 *                          description: provider last name
 *                          example: Dow
 *                      active:
 *                          type: boolean
 *                          enum: [true, false]
 *                          description: provider status active or inactive
 *                          example: true
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, createValidator, providerController.create);

/**
 * @swagger
 * /providers/{id}:
 *   put:
 *     summary: Update provider data
 *     tags: [Providers]
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
 *          application/x-www-form-urlencoded:
 *              schema:
 *                  type: object
 *                  required: 
 *                      - prov_code
 *                      - firstname
 *                      - lastname
 *                      - active
 *                  properties:
 *                     prov_code:
 *                      type: string
 *                     firstname:
 *                      type: string
 *                     lastname:
 *                      type: string
 *                     active:
 *                      type: boolean
 *                      enum: [true, false]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, updateValidator, providerController.update);

/**
 * @swagger
 * /providers/{id}:
 *   delete:
 *     summary: Delete provider data
 *     tags: [Providers]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *       required: true
 *       description: The id reference for provider deletes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.delete('/:id', authMiddleware, providerController.delete);

module.exports = router;