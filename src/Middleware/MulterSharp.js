const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const upload = multer({ storage: multer.memoryStorage() }).single('image');

const optimizeImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `${Date.now()}.webp`;

  await sharp(req.file.buffer)
    .resize(800, 800, { fit: 'inside' })
    .webp({ quality: 80 })
    .toFile(path.join('images', filename));

  req.file.filename = filename;
  next();
};

module.exports = { upload, optimizeImage };