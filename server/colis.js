
var db = require("./config/config.js");

let Colis = {

    getColis: function(trajet, callback)
    {
      return db.query('select * from colis where id=$1', [trajet.body.idColis],callback);
    }
};

module.exports = Colis;
