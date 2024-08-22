const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const {
  userValidator,
  userLoginValidator,
} = require("../validators/AuthValidator");

const authController = require("../controllers/AuthController");


/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *              name
 *              email
 *              password
 *              active
 *             properties:
 *               name:
 *                 type: string
 *                 description: name for user.
 *                 example: perenganito
 *               email:
 *                  type: string
 *                  format: email
 *                  description: email used for username
 *                  example: perenganito@example.com
 *               password:
 *                  type: string
 *                  format: password
 *                  description: passsword for username
 *                  example: qwerty
 *               active:
 *                  type: boolean
 *                  description: active or inactive
 *                  enum: [active, inactive]
 *                  example: active
 *     responses:
 *       201:
 *         description: User registered
 *       500:
 *         description: Error registering user
 */
router.post("/register", userValidator, authController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *              email
 *              password
 *             properties:
 *               email:
 *                 type: string
 *                 description: username for login
 *                 format: email
 *                 example: perenganito@example.com
 *               password:
 *                 type: string
 *                 description: password for account
 *                 format: password
 *                 example: qwerty
 * 
 *     responses:
 *       200:
 *         description: Successful login
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Error logging in
 */
router.post("/login", userLoginValidator, authController.login);


module.exports = router;
