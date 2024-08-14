import express from 'express';
const router = express.Router();

import auth from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import { getAllBooks, getOneBook, createBook } from '../controllers/books.js';

router.get('/', getAllBooks);
router.get('/:id', getOneBook);
router.post('/', auth, multer, createBook);

export default router;