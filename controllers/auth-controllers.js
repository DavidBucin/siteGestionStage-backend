const Etudiant = require("../models/etudiant");
const Employeur = require("../models/employeur");

const checkAccount = async (req, res) => {
  const { courriel, role } = req.body;

  try {
    let accountExists = false;

    if (role === 'etudiant') {
      accountExists = await Etudiant.exists({ courriel });
    } else if (role === 'employeur') {
      accountExists = await Employeur.exists({ courriel });
    }

    res.json({ accountExists });
  } catch (error) {
    console.error("Error checking account existence:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { checkAccount };
