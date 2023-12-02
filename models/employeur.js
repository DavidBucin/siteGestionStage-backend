const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeurSchema = new Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    courriel: {type: String, required: true},
    nomEntreprise:{type: String, required: true},
    adresse: {type: String, required: true},
    telephone: {type: String, required: true},
    posteTel: {type: String, required: true},
    motDePasse: {type: String, required: true}
});

module.exports = mongoose.model("Employeur", employeurSchema);