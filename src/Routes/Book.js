const express = require('express');
const router = express.Router();

const bookCtrl = require('../Controllers/Book');
const auth = require('../Middleware/Auth');
const multer = require('../Middleware/Multer');

router.get('/', bookCtrl.getAllBook);
router.get('/:id', bookCtrl.getBookById);
router.get('/bestrating', bookCtrl.getBestRatings);
router.post('/', auth, multer, bookCtrl.createBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.delete('/:id/rating', auth, bookCtrl.postRating);

module.exports = router;
