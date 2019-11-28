
var db = require("./config/config.js");

let Utilisateur = {

    getUtilisateur: function(utilisateur, callback)
    {
      console.log("getUser : " + utilisateur.body.mail);
      return db.query('SELECT password FROM utilisateur WHERE mail = $1', [utilisateur.body.mail],callback);
    }
};

module.exports = Utilisateur;
