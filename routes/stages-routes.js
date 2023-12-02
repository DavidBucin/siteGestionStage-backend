const express = require("express");

const controleursStage = require("../controllers/stages-controllers")
const router = express.Router();

router.get("/listeStage", controleursStage.getStages);
router.get("/:nomEntreprise", controleursStage.getStageEmploy);
router.post('/', controleursStage.ajouterStage);
router.delete('/supprimerStage', controleursStage.supprimerStage);
router.get('/:stageId', controleursStage.getStageId);

module.exports = router;
