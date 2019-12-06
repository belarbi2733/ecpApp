var db = require("./config/config.js");

let Trajet = {
  getTrajet: function(trajet, callback)
  {
    return db.query('SELECT * FROM trajet WHERE id_user = $1 ',[trajet.body.idUser],callback);
  }
};
module.exports = Trajet;
