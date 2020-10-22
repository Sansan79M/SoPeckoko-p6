const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup); //Enregistre le nouvel email et cript le mot de passe
router.post('/login', userCtrl.login); //Vérifie l'email et le mot de passe et transmet l'userID

module.exports = router;

