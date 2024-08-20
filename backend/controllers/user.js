import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';

export const signup = async (req, res, next) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    try {
      const user = new User({
        email: req.body.email,
        password,
      });
      await user.save();
      res.status(201).json({ message: 'Utilisateur crée !' });
    } catch (error) {
      res.status(400).json({ error });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(401)
        .json({ message: 'Paire identifiant/mot de passe incorrecte' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN, {
      expiresIn: '24h',
    });

    res.status(200).json({
      userId: user._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
