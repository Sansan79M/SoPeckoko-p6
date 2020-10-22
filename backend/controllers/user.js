const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const xss = require('xss');
const User = require('../models/User.js');

//Cryptage du token
require('dotenv').config()
const TOKEN = process.env.TOKEN;

//Création d'un nouveau compte utilisateur
exports.signup = (req, res, next) => {
  if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$/.test(req.body.password)) {
    return res.status(401).json({ error: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre (8 caractères minimum)' });
  } else {
    bcrypt.hash((req.body.password), 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Votre compte à bien été créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  }
};

//Connexion à un compte utilisateur déjà existant
exports.login = (req, res, next) => {
  User.findOne({ email: xss(req.body.email) })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Votre adresse mail n\'est pas enregistrée !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Votre mot de passe est incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              TOKEN,
              { expiresIn: '6h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
