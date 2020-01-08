var db = require("../config/config.js");
/**
*Rides module that contain all SQL request that are relative to the ride table
*@module
*/
let Trajet = {
  /**
  *@method getTrajet
  *@desc select rides informations according to the id of a user
  *@param {number}idUser
  */
  getTrajet: function(trajet, callback)
  {
    return db.query('SELECT * FROM trajet WHERE id_user = $1 ',[trajet.body.idUser],callback);
  },
  /**
  *@method getTrajetConduct
  *@desc select rides information according to the ride id
  *@param {number}id id of a ride
  */
  getTrajetConduct: function(trajet, callback)
  {
    return db.query('select * from trajet where id = $1',[trajet.body.id] ,callback);
  },
  /**
  *@method getTrajetColis
  *@desc select rides informations of a ride that has a package
  *@param {number}idColis
  */
  getTrajetColis: function(idColis, callback)
  {
    return db.query('select * from trajet where id_colis = $1',[idColis] ,callback);
  },
  /**
  *@method getColisId
  *@desc get the id of a package of a user
  *@param {number}idUser
  */
  getColisId: function(trajet, callback)
  {
    return db.query('select id_colis from trajet where id_user = $1',[trajet.body.idUser],callback);
  },
  /**
  *@method getTrajetAll
  *@desc select rides inforamtions of a ride that is into a specific round
  *@param {number}idTour
  */
  getTrajetAll: function(trajet, callback)
  {
    console.log(trajet.body.idTour);
    return db.query('select * from trajet where id_tournee = $1',[trajet.body.idTour],callback);
  },
  /**
  *@method getCode
  *@desc get the code that is relative to a ride
  *@param {number}id id of the ride
  */
  getCode: function(trajet, callback){
    return db.query('select code from trajet where id = $1', [trajet.body.id], callback);
  },
  /**
  *@method validateStatus
  *@desc set the status of a ride to 2 that means that the ride has been done
  *@param {nummber}id id of the ride
  */
  validateStatus: function(id, callback){
    return db.query('update trajet set statut=2 where id = $1', [id], callback);
  },
  /**
  *@method setComment
  *@desc set the message into the database and change the ride statut to 3 that means that the user has complain
  *@param {string}comment the message that the user send to the admin
  *@param {number}id id of the ride
  *@link
  */
  setComment: function(info, callback){
    return db.query('update trajet set comment = $1, statut=3 where id= $2', [info.query['comment'], info.query['id']], callback);
  }
};
module.exports = Trajet;
