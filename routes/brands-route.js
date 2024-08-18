const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const brandsController = require('../controllers/BrandsController');
const { createValidator, updateValidator }  = require('../validators/BrandValidators');

/**
 * @swagger
 * /brands:
 *   get:
 *     summary: Get brand data
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
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
 *         description: Brand data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.get('/', authMiddleware, brandsController.filter);

/**
 * @swagger
 * /brands:
 *   post:
 *     summary: Create brand data
 *     tags: [Brands]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                      photo_path:
 *                          type: string
 *                      active:
 *                          type: boolean
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
router.post('/', authMiddleware, createValidator, brandsController.create);

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
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                     name:
 *                      type: string
 *                     photo_path:
 *                      type: string
 *                     active:
 *                      type: boolean
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
router.put('/:id', authMiddleware, updateValidator, brandsController.update);

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