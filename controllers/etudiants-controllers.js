const { response } = require("express");
const {v4 : uuidv4} = require("uuid");
const HttpErreur = require("../models/http-erreur");
const Etudiant = require("../models/etudiant");

 
const getEtudiant = async (requete, reponse, next) => {
  const courriel = requete.params.courriel;
  let infoEtu;
  try {
    infoEtu = await Etudiant.findOne({ courriel });;
  } catch(err) {
    return next(
      new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
    );
  }
  if (!infoEtu) {
    return next(new HttpErreur("Aucune étudiant trouvé pour le courriel fourni", 404));
  }
  reponse.json({ etu: infoEtu.toObject({getters:true}) });
};

const ajouterEtudiant= async (requete, reponse, next) => {
  const {nom, prenom, courriel, adresse, telephone, motDePasse} = requete.body;
  let etudiantExiste;

  try {
    etudiantExiste = await Etudiant.findOne({ telephone: telephone });
  } catch {
      return next(new HttpErreur("Échec vérification etudiant existe", 500));
  }

  if (etudiantExiste) {
      return next(
          new HttpErreur("Etudiant existe déjà. Veuillez rééssayer", 422)
      );
  }
  const nouveauEtudiant = new Etudiant({
    nom,
    prenom,
    courriel,
    adresse,
    telephone,
    motDePasse
  });
  try {
    await nouveauEtudiant.save();
  } catch (err) {
    const erreur = new HttpErreur("Ajoue de l'étudiant a échouée", 500);
    return next(erreur);
  }
  reponse.status(201).json({ etudiant: nouveauEtudiant.toObject({ getter: true }) });
};

exports.ajouterEtudiant = ajouterEtudiant;
exports.getEtudiant = getEtudiant;