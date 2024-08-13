const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.getAllBooks);
router.get('/:id', booksCtrl.getOneBook);

module.exports = router;