var db = require("./config/config.js");

let Car = {
  getIdCar: function(car, callback)
  {
    return db.query('SELECT id FROM voiture WHERE iduser=$1 ',[car.body.idUser],callback);
  }
};
module.exports = Car;
