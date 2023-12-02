const express = require("express");

const controleursEtudiant = require("../controllers/etudiants-controllers")
const router = express.Router();

router.get("/:courriel",controleursEtudiant.getEtudiant);
router.post('/ajouterEtudiant',controleursEtudiant.ajouterEtudiant);

module.exports = router;