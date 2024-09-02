const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const providerController = require('../controllers/ProviderController');
const { createValidator, updateValidator } = require('../validators/ProviderValidator');

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
 * /providers:
 *   get:
 *     summary: Get provider data
 *     tags: [Providers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: integer
 *        required: false
 *        description: provider id
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
 *          $ref: '#/components/schemas/use_active_filter'
 *        required: false
 *        description: filter by active
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
 *                      - brand_id
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
 *                      brand_id:
 *                          type: integer
 *                          description: brand id
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
 *                      - brand_id
 *                      - active
 *                  properties:
 *                     prov_code:
 *                      type: string
 *                     firstname:
 *                      type: string
 *                     lastname:
 *                      type: string
 *                     brand_id:
 *                      type: integer
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




/**
 * @swagger
 * /providers/{id}:
 *   get:
 *     summary: Retrieve providers by id (Additional Method)
 *     tags: [Providers]
 *     description: >
 *      This endpoint allows you to retrieve brands filtered by their id **Additional Methods**.
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
 *         description: get provider
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/:id', authMiddleware, providerController.findById);

/**
 * @swagger
 * /providers/{id}/enable:
 *  put:
 *      summary: active the provider (Additional Method)
 *      tags: [Providers]
 *      description: >
 *          active de provider id **Additional Method**
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: provider id
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
router.put('/:id/enable', authMiddleware, providerController.activate);

/**
 * @swagger
 * /providers/{id}/disable:
 *  put:
 *      summary: deactivate the provider (Additional Method)
 *      tags: [Providers]
 *      description: >
 *          deactive provider id **Additional Method**.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: provider id
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
router.put('/:id/disable', authMiddleware, providerController.deactivate);



module.exports = router;