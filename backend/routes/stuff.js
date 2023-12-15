const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const ratingCtrl = require('../controllers/rating');

router.get('/books', stuffCtrl.getAllBooks);
router.get('/books/bestrating', ratingCtrl.getBestRating);
router.get('/books/:id', stuffCtrl.getOneBook);

router.post('/books', auth, multer, stuffCtrl.createBook);
router.post('/books/:id/rating', auth, multer, ratingCtrl.modifyRating);

router.put('/books/:id', auth, multer, stuffCtrl.modifyBook);
router.delete('/books/:id', auth, stuffCtrl.deleteBook);

module.exports = router;