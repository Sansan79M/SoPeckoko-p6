const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');

const auth = require('../middleware/auth'); //Sécurisation des données utilisateurs avec un token
const multer = require('../middleware/multer-config'); //Gestion des images

router.post('/', auth, multer, sauceCtrl.createSauce); //Enregistre une nouvelle sauce avec son image 
router.get('/', auth, sauceCtrl.getAllSauces); //Affiche le tableau de toutes les sauces
router.get('/:id', auth, sauceCtrl.getOneSauce); //Récupère une sauce avec son ID pour affichage
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //Met à jour la sauce et son image via son ID
router.delete('/:id', auth, sauceCtrl.deleteSauce); //Supprime la sauce et son ID
router.post('/:id/like', auth, sauceCtrl.likeSauce); //Enregistre les likes et les dislikes de l'userID

module.exports = router;