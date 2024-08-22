const express = require("express");

const router = express.Router();

const multer = require('multer');
//const storage = require('./storageConfig'); 

const {authMiddleware} = require('../middlewares/AuthMiddleware');

const storage = require('../middlewares/StorageMiddleware');
const upload = multer({ storage: storage });


const controller = require('../controllers/PhotosController');


/**
 * @swagger
 * /photos:
 *   post:
 *     summary: Upload an image
 *     tags: [Images]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image to upload
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imageId:
 *                   type: string
 *                   description: The ID of the uploaded image
 */
//router.post("/", upload.single('image'),  controller.create );
router.post("/", upload.single(""), controller.create );


module.exports = {router}