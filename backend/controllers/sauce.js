const Sauce = require('../models/Sauce.js');
const fs = require('fs');

//Enregistre une nouvelle sauce avec son image
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    sauceObject.likes = 0;
    sauceObject.dislikes = 0;
    sauceObject.usersLiked = [];
    sauceObject.usersDisliked = [];
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => res.status(200).json({ message: 'La sauce a été enregistrée avec succès !' }))
        .catch(error => res.status(400).json({ error }));
};

//Affiche le tableau de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}

//Récupère une sauce avec son ID
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(400).json({ error }));
}

//Met à jour la sauce et son image via son ID
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id, userId: req.body.userId }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'La sauce a été modifiée !' }))
        .catch(error => res.status(400).json({ error }));
}

//Supprime la sauce et son ID
exports.deleteSauce = (req, res, next) => {
    Sauce.findById(req.params.id, (err, sauce) => {
        if (err) {
            return res.status(500).json({ err });
        }
        //Impossible de vérifier l'id de l'utilisateur pour le moment (frontend)
        /* if(req.body.userId !== sauce.userId) {
             return res.status(403).json({ error : 'Vous n\'êtes pas autorisé à supprimer la sauce' });
         }*/
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: 'La sauce a été supprimée !' }))
                .catch(error => res.status(400).json({ error }));
        });
    })
};


//Enregistre les likes et les dislikes de l'userID
exports.likeSauce = (req, res, next) => {
    switch (req.body.like) {
        case 1:
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 }, //incrémente de 1 le nombre de likes
                $push: { usersLiked: req.body.userId } //ajoute l'userId aux likes 
            })
                .then(() => res.status(200).json({ message: "L'utilisateur ajoute son like" }))
                .catch(error => res.status(400).json({ error }));
            break;

        case 0:
            Sauce.findById(req.params.id, (err, sauceResolve) => {
                if (err) {
                    return res.status(400).json({ error });
                }
                if ((sauceResolve.usersLiked.findIndex(userId => userId == req.body.userId)) > -1) {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $inc: { likes: -1 }, //décrémente de 1 le nombre de likes
                        $pull: { usersLiked: req.body.userId } //retire l'userId des likes
                    })
                        .then(() => res.status(200).json({ message: "L'utilisateur annule son like" }))
                        .catch(error => res.status(400).json({ error }));
                } else {
                    Sauce.updateOne({ _id: req.params.id }, {
                        $inc: { dislikes: -1 }, //décrémente de 1 le nombre de dislikes
                        $pull: { usersDisliked: req.body.userId } //retire l'userId des dislikes
                    })
                        .then(() => res.status(200).json({ message: "L'utilisateur annule son dislike" }))
                        .catch(error => res.status(400).json({ error }));
                }
            });
            break;

        case -1:
            Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 }, //incrémente de 1 le nombre de dislikes
                $push: { usersDisliked: req.body.userId } //ajoute l'userId aux dislikes 
            })
                .then(() => res.status(200).json({ message: "L'utilisateur ajoute son dislike" }))
                .catch(error => res.status(400).json({ error }));
    }
}