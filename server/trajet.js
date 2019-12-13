var db = require("./config/config.js");

let Trajet = {
  getTrajet: function(trajet, callback)
  {
    return db.query('SELECT * FROM trajet WHERE id_user = $1 ',[trajet.body.idUser],callback);
  },
  getTrajetConduct: function(trajet, callback)
  {
    return db.query('select * from trajet where id = $1',[trajet.body.id] ,callback);
  },
  getTrajetOnly: function(trajetonly, callback)
  {
    return db.query('select * from trajet where (id_user = $1 AND id_tournee IS NULL)',[trajetonly.body.idUser],callback);
  },
  //sélectionne tous les trajets qui ne font pas partie d'une tournée (pour simple traj pour conducteur)

  getColisId: function(trajet, callback)
  {
    return db.query('select id_colis from trajet where id_user = $1',[trajet.body.idUser],callback);
  },
  getTrajetAll: function(trajet, callback)
  {
    console.log(trajet.body.idTour);
    return db.query('select * from trajet where id_tournee = $1',[trajet.body.idTour],callback);
  },
  getTourneeId: function(trajet, callback)
  {
    return db.query('select id_tournee from trajet where id_user = $1',[trajet.body.idUser],callback);
  },
  getCode: function(trajet, callback){
    return db.query('select code from trajet where id = $1', [trajet.body.id], callback);
  }
};
module.exports = Trajet;
