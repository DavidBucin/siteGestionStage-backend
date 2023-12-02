const express = require("express");

const controleursEmployeur = require("../controllers/employeur-controllers")
const router = express.Router();

router.get("/:courriel",controleursEmployeur.getEmployeur);
router.post('/ajouterEmployeur',controleursEmployeur.ajouterEmployeur);

module.exports = router;