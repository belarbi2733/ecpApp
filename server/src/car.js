var db = require("../config/config.js");
/**
*Car Module that contains all SQL request that are relatives to car table
*@module
*/
let Car = {
  /**
  *@method getIdCar
  *@desc get the id car of a user
  *@param {number}idUser
  */
  getIdCar: function(car, callback)
  {
    return db.query('SELECT id FROM voiture WHERE id_user=$1 ',[car.body.idUser],callback);
  }
};
module.exports = Car;
