var db = require("../config/config.js");
/**
*Rounds module that contain all SQL request that are relative to round table
*@module
*/
let Tournee = {
  /**
  *@method getTournee
  *@desc select round informations relative the driver
  *@param {number}idUser
  */
  getTournee: function(tournee, callback)
  {
    return db.query('SELECT * FROM tournee WHERE id_voiture = (SELECT id FROM voiture WHERE id_user=$1)',[tournee.body.idUser],callback);
  }
};

module.exports = Tournee;
