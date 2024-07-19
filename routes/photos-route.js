const express = require("express");
const router = express.Router();

const {authMiddleware} = require('../middlewares/AuthMiddleware');


const controller = require('../controllers/PhotosController');

/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Get photos data
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: photos data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
route.post("/", authMiddleware,  controller.create );
/**
 * @swagger
 * /photos:
 *   get:
 *     summary: Get photos data
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: photos data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
route.get("/", authMiddleware,  controller.retrive );
/**
 * @swagger
 * /photos:
 *   put:
 *     summary: Update photos data
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: photos data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
route.put("/", authMiddleware,  controller.update );
/**
 * @swagger
 * /photos:
 *   delete:
 *     summary: Delete photos data
 *     tags: [Photos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: photos data
 *       401:
 *         description: Access denied. No token provided.
 *       400:
 *         description: Invalid token
 */
route.delete("/", authMiddleware,  controller.delete );

