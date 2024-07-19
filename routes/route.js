const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');
const {
  userValidator,
  userLoginValidator,
} = require("../validators/AuthValidator");

const authController = require("../controllers/AuthController");
const productsController = require('../controllers/ProductsController');

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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                  type: string
 *               password:
 *                 type: string
 *               active:
 *                  type: boolean
 *               user_id:
 *                  type: integer
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
