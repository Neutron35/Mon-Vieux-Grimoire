import express from 'express';

import auth from '../middleware/auth.js';
import multerMiddleware from '../middleware/multer-config.js';

import { getAllBooks, getOneBook, createBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.post('/', auth, multerMiddleware, createBook);

export default router;
