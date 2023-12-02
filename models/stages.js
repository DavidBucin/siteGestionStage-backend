const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const coursSchema = new Schema({
    nomEntreprise:{type: String, required: true},
    numContact:{type: String, required: true},
    nomPoste:{type: String, required: true}
});

module.exports = mongoose.model("Stages", coursSchema);