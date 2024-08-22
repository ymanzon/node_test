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
 * /brands/{id}:
 *   get:
 *     summary: ger braand by id
 *     tags: [Brands]
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
 * /brands:
 *   get:
 *     summary: Get brand
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *            type: string
 *        required: false
 *        description: filter by name
 *      - in: query
 *        name: active
 *        schema:
 *          type: boolean
 *          enum:  [true, false]
 *        required: false
 *        description: filter by active
 *      - in: query
 *        name: create_at
 *        scheme:
 *          type: string
 *          format: date
 *        required: false
 *        description: Filter by the date of creation (yyyy-MM-dd )
 *        example: 2024-07-30
 *      - in: query
 *        name: start_create_at
 *        scheme:
 *          type: string
 *          format: date
 *        required: false
 *        description: Filter by the start date of creation (yyyy-MM-dd )
 *      - in: query
 *        name: end_create_at
 *        scheme:
 *          type: string
 *          format: date
 *        required: false
 *        description: Filter by the end date of creation (yyyy-MM-dd )
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

module.exports = router;