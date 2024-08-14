import express from 'express';
import mongoose from 'mongoose';
import mongoCred from './cred.js';
import path from 'path';
import userRoutes from './routes/user.js';
import booksRoutes from './routes/books.js';

const __dirname = import.meta.dirname;
const app = express();

mongoose.connect(`mongodb+srv://${mongoCred.username}:${mongoCred.pwd}@${mongoCred.address}/?retryWrites=true&w=majority&appName=MVG`,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);

export default app;