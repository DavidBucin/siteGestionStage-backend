
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const path = require("path"); 
const app = express();



const stagesRoutes = require("./routes/stages-routes");
const etudiantsRoutes = require("./routes/etudiants-routes");
const employeursRoutes = require("./routes/employeurs-routes");
const HttpErreur = require("./models/http-erreur");



app.use(bodyParser.json());

app.use((requete, reponse, next) =>{
  reponse.setHeader("Access-Control-Allow-Origin", "*");
  reponse.setHeader("Access-Control-Allow-Headers", "*");
  reponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
})

app.use("/api/stages", stagesRoutes);
app.use("/api/etudiants", etudiantsRoutes);
app.use("/api/employeurs", employeursRoutes);

app.use((requete, reponse, next) => {
  return next(new HttpErreur("Route non trouvée", 404));
});
app.use(express.static(path.join(__dirname, "client/build")));


app.get("*", (requete, reponse) => {
  reponse.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.use((error, requete, reponse, next) => {
  if (reponse.headerSent) {
    return next(error);
  }
  reponse.status(error.code || 500);
  reponse.json({
    message: error.message || "Une erreur inconnue est survenue",
  });
});

mongoose
.connect("mongodb+srv://dav:davdav@cluster0.hcqpbx9.mongodb.net/")
.then(() => {
    app.listen(5000)
    console.log("Connexion à la base de données réussie");
})
.catch(erreur => {
    console.log(erreur);
});
