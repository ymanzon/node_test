const express = require("express");
const router = express.Router();
const multer = require('multer');

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const brandsController = require('../controllers/BrandsController');
const { createValidator, updateValidator }  = require('../validators/BrandValidators');

const storage = require('../middlewares/StorageMiddleware');
const upload = multer({ storage: storage });

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
 * /brands:
 *   get:
 *     summary: Get brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: id
 *        schema:
 *          type: integer
 *        description: filter brand id
 *      - in: query
 *        name: name
 *        schema:
 *            type: string
 *        required: false
 *        description: filter by name
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
 *         description: Brand data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/', authMiddleware, brandsController.filter);

/**
 * @swagger
 * components:
 *  schemas:
 *      Brand:
 *          type: object
 *          required:
 *          - name
 *          - active
 *          properties:
 *              name:
 *                  type: string
 *                  description: brand name
 *                  example: Brand XYZ
 *              image:
 *                  type: string
 *                  format: binary
 *                  description: image of brand
 *              active:
 *                  type: boolean
 *                  enum: [true, false]
 *                  description: active or inactive brand
 *                  example: true
 * /brands:
 *   post:
 *     summary: Create brand data
 *     tags: [Brands]
 *     requestBody:
 *      required: true
 *      content:
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required:
 *                      - name
 *                      - active
 *                  properties:
 *                      name:
 *                          type: string
 *                          description: brand name
 *                          example: DELL
 *                      image:
 *                          type: string
 *                          format: binary
 *                          description: brand photo image
 *                      active:
 *                          type: boolean
 *                          enum: [true, false]
 *                          description: active brand status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Create brand
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.post('/', authMiddleware, upload.single('image'), createValidator, brandsController.create);

/**
 * @swagger
 * /brands/{id}:
 *   put:
 *     summary: Update brand data
 *     tags: [Brands]
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
 *          multipart/form-data:
 *              schema:
 *                  type: object
 *                  required:
 *                      - name
 *                      - active
 *                  properties:
 *                     name:
 *                      type: string
 *                      description: brand name
 *                      example: Brand XYZ
 *                     image:
 *                      type: string
 *                      format: binary
 *                      description: brand image
 *                     active:
 *                      type: boolean
 *                      enum: [true, false]
 *                      description: active or inactive brand
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update brand
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.put('/:id', authMiddleware, upload.single('image'), updateValidator, brandsController.update);

/**
 * @swagger
 * /brands/{id}:
 *   delete:
 *     summary: Delete brand data
 *     tags: [Brands]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *       required: true
 *       description: The id reference for brand deletes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete brand
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.delete('/:id', authMiddleware, brandsController.delete);



/**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Retrieve tasks by id (Additional Method)
 *     tags: [Brands]
 *     description: >
 *      This endpoint allows you to retrieve brands filtered by their id **Additional Methods**.
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
 *         description: Update brand
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/:id', authMiddleware, brandsController.findById);

/**
 * @swagger
 * /brands/{id}/enable:
 *  put:
 *      summary: active the brand (Additional Method)
 *      tags: [Brands]
 *      description: >
 *          active de brand id **Additional Method**
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: brand id
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
router.put('/:id/enable', authMiddleware, brandsController.activate);

/**
 * @swagger
 * /brands/{id}/disable:
 *  put:
 *      summary: deactivate the brand (Additional Method)
 *      tags: [Brands]
 *      description: >
 *          deactive brand id **Additional Method**.
 *      parameters:
 *          - in: path
 *            name: id
 *            schema: 
 *              type: integer
 *            required: true
 *            description: brand id
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
router.put('/:id/disable', authMiddleware, brandsController.deactivate);

module.exports = router;