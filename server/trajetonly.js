var db = require("./config/config.js");

let TrajetOnly = {
  getTrajetOnly: function(trajetonly, callback)
  {
    return db.query('select * from trajet where (id_user = $1 AND id_tournee IS NULL)',[trajetonly.body.idUser],callback);
  }
};
module.exports = TrajetOnly;

//sélectionne tous les trajets qui ne font pas partie d'une tournée (pour simple traj pour conducteur)
