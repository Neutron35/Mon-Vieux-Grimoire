const express = require('express');
const mongoose = require('mongoose');
const mongoCred = require('./cred');

const userRoutes = require('./routes/user');
const booksRoutes = require('./routes/books');

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

app.use('/api/auth', userRoutes);
app.use('/api/books', booksRoutes);

module.exports = app;