const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sauceRoutes = require('./routes/sauce.js');
const userRoutes = require('./routes/user.js');

const app = express();

//Cryptage du lien mongoDB
require('dotenv').config()
const MDB_LINK = process.env.MDB_LINK;

//API connectée à la base de donnée
mongoose.connect
  (MDB_LINK,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => console.log('La connexion à MongoDB a réussie !'))
  .catch(() => console.log('La connexion à MongoDB a échouée !'));


//Middlewares de sécurité
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());//Manipulation du JSON

app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);

module.exports = app;
