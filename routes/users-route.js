const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const usersController = require('../controllers/UsersController');
const { createValidator, updateValidator }  = require('../validators/UserValidator');

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: email
 *        schema:
 *            type: string
 *        required: false
 *      - in: query
 *        name: active
 *        schema:
 *          type: bolean
 *        required: false
 *      - in: query
 *        name: user_id
 *        schema:
 *          type: int
 *        required: false
 *      - in: query
 *        name: create_at
 *        schema:
 *          type: string
 *        required: false
 *      - in: query
 *        name: update_at
 *        schema:
 *          type: string
 *        required: false
 *     responses:
 *       200:
 *         description: user data retrive
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 *       500:
 *         description: Internal server ERROR
 */
router.get("/", authMiddleware, usersController.filter);

 /**
 * @swagger
 * /users:
 *   post:
 *      summary: create user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                           type: string
 *                          email:
 *                           type: string
 *                          password:
 *                           type: string
 *                           format: password
 *                          active:
 *                           type: boolean
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        200:
 *          description: Creae user
 *        401:
 *          description: access denied. token invalid
 *        400:
 *          description: invalid token
 *        500:
 *          description: internal server error
 */
router.post("/", authMiddleware, createValidator, usersController.create );

/**
 * @swagger
 * /users/{id}:
 *  put:
 *   summary: Update user data
 *   tags: [Users]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema: 
 *       type: integer
 *      required: true
 *      description: User id
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema: 
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *        email:
 *         type: string
 *        password:
 *         type: string
 *         format: password
 *        active:
 *         type: boolean
 *   security:
 *    - bearerAuth: []
 *   responses:
 *    200:
 *     description: update user
 *    401:
 *     description: access denied
 *    400:
 *     description: invalid token
 *    500:
 *     description: internal server error 
 */
router.put("/:id", authMiddleware, updateValidator, usersController.update );

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user data
 *     tags: [Users]
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *          type: integer
 *       required: true
 *       description: The id reference for user deletes
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Delete user
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
router.delete("/:id", authMiddleware, usersController.delete);

module.exports = router;