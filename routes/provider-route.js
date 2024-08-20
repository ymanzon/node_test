const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const providerController = require('../controllers/ProviderController');
//const { createValidator, updateValidator } = require('../validators/CustomerValidator');

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
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      prov_code:
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
 *         description: Create provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, providerController.create);

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
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     prov_code:
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
 *         description: Update provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, providerController.update);

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