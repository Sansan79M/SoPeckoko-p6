const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({

  //userId: { type: String, required: true }, //Identifiant unique créé par MongoDB pour l'utilisateur qui a créé la sauce
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }

});

userSchema.plugin(mongooseUniqueValidator); //Un email ne peut être saisie qu'une seule fois

module.exports = mongoose.model('User', userSchema);
