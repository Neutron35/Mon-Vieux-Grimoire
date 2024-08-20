import express from 'express';

import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multer-config.js';

import {
  getAllBooks,
  getOneBook,
  getBestRatedBooks,
  createBook,
  modifyBook,
} from '../controllers/books.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/bestrating', getBestRatedBooks);
router.get('/:id', getOneBook);
router.put('/:id', auth, multerMiddleware, modifyBook);
router.post('/', auth, multerMiddleware, createBook);

export default router;
