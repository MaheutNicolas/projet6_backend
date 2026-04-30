const express = require('express');
const router = express.Router();
const bookCtrl = require('../Controllers/Book');
const { validateCreateBook, validateUpdateBook, validateRating } = require('../Validator/Book');
const auth = require('../Middleware/Auth');
const { upload, optimizeImage } = require('../Middleware/MulterSharp');

router.get('/', bookCtrl.getAllBook);
router.get('/bestrating', bookCtrl.getBestBooks);
router.get('/:id', bookCtrl.getBookById);
router.post('/', auth, upload, validateCreateBook, optimizeImage, bookCtrl.createBook);
router.put('/:id', auth, upload, validateUpdateBook, optimizeImage, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, validateRating, bookCtrl.postRating);

module.exports = router;