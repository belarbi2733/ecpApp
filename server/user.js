
var db = require("./config/config.js");

let Utilisateur = {

    getUtilisateur: function(utilisateur, callback)
    {
      return db.query('SELECT * FROM utilisateur WHERE mail = $1', [utilisateur.body.mail],callback);
    },

    getIdUtilisateurByMail: function(mail, callback)
    {
      return db.query('SELECT id FROM utilisateur WHERE mail = $1', [mail], callback);
    },
    addPosition: function(utilisateur, callback){
      return db.query('UPDATE utilisateur SET position = $1 WHERE id = $2', [utilisateur.query['lat'], utilisateur.query['idUser']], callback);
    }
};

module.exports = Utilisateur;
