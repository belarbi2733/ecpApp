
var db = require("../config/config.js");
/**
*Package module that contain all SQL request relatives to package table
*@module
*/
let Colis = {
    /**
    *@method getColis
    *@desc select informations about a package
    *@param {number}idColis
    */
    getColis: function(trajet, callback)
    {
      return db.query('select * from colis where id=$1', [trajet.body.idColis],callback);
    },
    /**
    *@method getColisOnly
    *@desc Get informations about the transfer of a package of a user that do not travel with his package
    *@param {number}id id of the owner of the package
    */
    getColisOnly: function(id,callback){
      return db.query('SELECT * FROM trajet INNER JOIN colis ON trajet.id_colis = colis.id WHERE colis.id_user = $1 AND trajet.id_user IS null', [id], callback);
    }
};

module.exports = Colis;
