const { response } = require("express");
const {v4 : uuidv4} = require("uuid");
const HttpErreur = require("../models/http-erreur");
const Employeur = require("../models/employeur");


const getEmployeur = async (requete, reponse, next) => {
    const courriel = requete.params.courriel;
    let infoEmp;
    try {
      infoEmp = await Employeur.findOne({ courriel });;
    } catch(err) {
      return next(
        new HttpErreur("Erreur lors de la récupération de l'employeur", 500)
      );
    }
    if (!infoEmp) {
      return next(new HttpErreur("Aucune employeur trouvé pour le couriel fourni", 404));
    }
    reponse.json({ emp :infoEmp.toObject({getters:true}) });
  };
  
  const ajouterEmployeur= async (requete, reponse, next) => {
    const {nom, prenom, courriel, nomEntreprise, adresse, telephone, posteTel, motDePasse} = requete.body;
    let employeurExiste;
  
    try {
      employeurExiste = await Employeur.findOne({ telephone: telephone });
    } catch {
        return next(new HttpErreur("Échec vérification employeur existe", 500));
    }
  
    if (employeurExiste) {
        return next(
            new HttpErreur("Employeur existe déjà. Veuillez rééssayer", 422)
        );
    }
    const nouveauEmployeur = new Employeur({
        nom,
        prenom,
        courriel,
        nomEntreprise,
        adresse,
        telephone,
        posteTel,
        motDePasse
    });
    try {
      await nouveauEmployeur.save();
    } catch (err) {
      const erreur = new HttpErreur("Ajoue de l'étudiant a échouée", 500);
      return next(erreur);
    }
    reponse.status(201).json({ employeur: nouveauEmployeur.toObject({ getter: true }) });
  };
  
  exports.ajouterEmployeur = ajouterEmployeur;
  exports.getEmployeur = getEmployeur;