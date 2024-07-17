const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');


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
router.post('/register', authController.register);

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
router.post('/login', authController.login);

module.exports = router;
