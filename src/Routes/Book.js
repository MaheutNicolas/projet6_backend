const express = require('express');
const router = express.Router();

const bookCtrl = require('../Controllers/Book');
const auth = require('../Middleware/Auth');
const multer = require('../Middleware/Multer');

router.get('/', bookCtrl.getAllBook);
router.get('/bestrating', bookCtrl.getBestBooks);
router.get('/:id', bookCtrl.getBookById);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.post('/:id/rating', auth, bookCtrl.postRating);

module.exports = router;
