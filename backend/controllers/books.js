import Book from '../models/Book.js';

export const getOneBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.params?.id === undefined) {
      return res.status(400).json({ message: 'ID invalide.' });
    }

    const book = await Book.findOne({
      _id: id,
    });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé.' });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    if (!books) {
      return res.status(404).json({ message: 'Aucun livre trouvé.' });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const getBestRatedBooks = async (req, res, next) => {
  try {
    const bestRatedBooks = await Book.find()
      .sort({ averageRating: -1 })
      .limit(3);

    if (!bestRatedBooks || bestRatedBooks.length === 0) {
      return res
        .status(404)
        .json({ message: 'Livres les mieux notés introuvables.' });
    }
    res.status(200).json(bestRatedBooks);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

export const createBook = async (req, res, next) => {
  try {
    const bookObject = req.body.book ? JSON.parse(req.body.book) : null;

    if (!bookObject) {
      return res
        .status(400)
        .json({ message: 'Erreur de validation des données' });
    }

    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
      ...bookObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      averageRating: 0,
      ratings: [],
    });

    await book.save();
    res.status(201).json({ message: 'Livre ajouté !' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const modifyBook = async (req, res, next) => {
  try {
    const bookObject = req.file
      ? {
          ...JSON.parse(req.body.book),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        }
      : { ...req.body };

    delete bookObject._userId;

    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    if (book.userId !== req.auth.userId) {
      return res.status(401).json({ message: 'Non autorisé !' });
    }

    if (req.file && book.imageUrl) {
      const oldFilename = path.basename(book.imageUrl);
      fs.unlink(path.join('images', oldFilename), (error) => {
        if (error) {
          console.error(error);
        }
      });
    }

    await Book.updateOne(
      { _id: req.params.id },
      { ...bookObject, _id: req.params.id },
    );

    res.status(200).json({ message: 'Livre modifié !' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findOne({ _id: req.params.id });

    if (!book) {
      return res.status(404).json({ message: 'Livre non trouvé' });
    }

    if (book.userId !== req.auth.userId) {
      res.status(403).json({ message: 'Non autorisé !' });
    }

    const filename = book.imageUrl.split('/images/')[1];

    fs.unlink(`images/${filename}`, async (unlinkError) => {
      if (unlinkError) {
        res.status(500).json({ error: unlinkError });
      }

      try {
        await Book.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Livre supprimé !' });
      } catch (error) {
        res.status(401).json({ error });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};