import 'dotenv/config';

import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import booksRoutes from './routes/books.js';
import userRoutes from './routes/user.js';

const __dirname = import.meta.dirname;
const app = express();

try {
  await mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connexion à MongoDB réussie !');
} catch {
  console.log('Connexion à MongoDB échouée !');
}

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);

export default app;
