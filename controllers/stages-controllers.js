const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");
const Stage = require("../models/stages");
const Etudiant = require("../models/etudiant");


const getStages = async (requete, reponse, next) => {
  let stage;
  try {
    stage = await Stage.find({},);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération du stage", 500)
    );
  }
  reponse.json({
    stage: stage.map((stage) =>
    stage.toObject({ getters: true })
    ),
  });
};

const getStageEmploy = async (requete, reponse, next) => {
    const nomEntreprise = requete.params.nomEntreprise;
    let stage;
    try {
      stage = await Stage.find({ nomEntreprise });;
    } catch (err) {
      return next(
        new HttpErreur("Erreur lors de la récupération du stage", 500)
      );
    }
    reponse.json({
      stage: stage.map((stage) =>
      stage.toObject({ getters: true })
      ),
    });
  };

  const getStageId = async (requete, reponse, next) => {
    const stageId = requete.params.stageId;
    let stage;
    try {
      stage = await Stage.findById(stageId);
    } catch (err) {
      return next(
        new HttpErreur("Erreur lors de la récupération du stage", 500)
      );
    }
    reponse.json({
      stage: stage.map((stage) =>
      stage.toObject({ getters: true })
      ),
    });
  };

const ajouterStage = async (requete, reponse, next) => {
  const { nomEntreprise,numContact, nomPoste} = requete.body;
  

  let stageExiste;

  try {
      stageExiste = await Stage.findOne({ numContact: numContact, nomEntreprise: nomEntreprise, nomPoste: nomPoste });
  } catch {
      return next(new HttpErreur("Échec vérification stage existe", 500));
  }

  if (stageExiste) {
      return next(new HttpErreur("Stage existe déjà. Veuillez rééssayer", 422));
  }
  const nouveauStage = new Stage({
    nomEntreprise,
    numContact,
    nomPoste
  });

  try {
    await nouveauStage.save();
  } catch (err) {
    const erreur = new HttpErreur("Création de stage échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ stage: nouveauStage.toObject({ getter: true }) });
};


const supprimerStage = async (requete, reponse, next) => {
  const stageId = requete.params.stageId;
  let stage;
  try {
    stage = await Stage.findById(stageId);
  } catch {
    return next(
      new HttpErreur("Erreur lors de la récupération du stage", 500)
    );
  }
  if(!stage){
    return next(new HttpErreur("Impossible de trouver le stage", 404));
  }
  
  try{
    await stage.deleteOne();  
  }catch (err) {
      const erreur = new HttpErreur("Erreur lors de la suppression du stage", 500);
      console.log(err);
      return next(erreur);
  }
  reponse.status(200).json({ message: "Stage supprimée" });
};

exports.supprimerStage= supprimerStage;
exports.getStageId = getStageId;
exports.getStageEmploy = getStageEmploy;
exports.getStages = getStages;
exports.ajouterStage = ajouterStage;
