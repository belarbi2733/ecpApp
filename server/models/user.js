var db = require("./db.js");

var Utilisateur= {
  getUtilisateur: funtion(utilisateur, callback){
    return db.query('SELECT * FROM utilisateur WHERE nom = $1 OR prenom = $2', [utilisateur.body.adresse_mail,utilisateur.body.mot_passe],callback);
  }
};

module.exports = Utilisateur;
