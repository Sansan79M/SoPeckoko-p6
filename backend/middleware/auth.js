const jwt = require('jsonwebtoken');

//Cryptage du token
require('dotenv').config()
const TOKEN = process.env.TOKEN;

//Sécurisation des données utilisateurs avec un token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Le User ID n\'est pas valable';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({error: error || 'La requête n\'a pas été authentifiée !'});
  }
};