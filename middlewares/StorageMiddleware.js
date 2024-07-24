const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Configurar almacenamiento de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Carpeta donde se guardarán las imágenes
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Cambiar el nombre del archivo con un hash único
    const ext = path.extname(file.originalname);
    const uniqueSuffix = crypto.randomBytes(16).toString('hex');
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

module.exports = storage;
