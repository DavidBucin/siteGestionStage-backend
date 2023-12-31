const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const etudiantSchema = new Schema({
    
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    courriel: {type: String, required: true},
    adresse: {type: String, required: true},
    telephone: {type: String, required: true},
    motDePasse: {type: String, required: true},
});

module.exports = mongoose.model("Etudiant", etudiantSchema);

