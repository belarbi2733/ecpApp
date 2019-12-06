var db = require("./config/config.js");

let Tournee = {
  getTournee: function(tournee, callback)
  {
    return db.query('SELECT * FROM tournee WHERE id_voiture = (SELECT id FROM voiture WHERE iduser=$1)',[tournee.body.idUser],callback);
  }
};

module.exports = Tournee;
