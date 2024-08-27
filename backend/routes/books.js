import express from 'express';
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBestRatedBooks,
  getOneBook,
  modifyBook,
  rateBook,
} from '../controllers/books.js';
import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multer-config.js';
import sharpMiddleware from '../middleware/sharp-config.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/bestrating', getBestRatedBooks);
router.get('/:id', getOneBook);
router.put('/:id', auth, multerMiddleware, sharpMiddleware, modifyBook);
router.delete('/:id', auth, deleteBook);
router.post('/:id/rating', auth, rateBook);
router.post('/', auth, multerMiddleware, sharpMiddleware, createBook);

export default router;
