
var db = require("../config/config.js");
/**
*User module that contain all SQL request that are relative to the user table
*@module
*/
let Utilisateur = {
    /**
    *@method getUtilisateur
    *@desc request that select informations from the database about a user according to his mail
    *@param {string} mail
    */
    getUtilisateur: function(utilisateur, callback)
    {
      return db.query('SELECT * FROM utilisateur WHERE mail = $1', [utilisateur.body.mail],callback);
    },
    /**
    *@method getIdUtilisateurByMail
    *@desc request that select id of a user from the database according to his mail
    *@param {string}mail
    */
    getIdUtilisateurByMail: function(mail, callback)
    {
      return db.query('SELECT id FROM utilisateur WHERE mail = $1', [mail], callback);
    },
    /**
    *@method addPosition
    *@desc update user's location in the database
    *@param {string}lat
    *@param {string}long
    *@param {number}idUser id of the user
    */
    addPosition: function(utilisateur, callback){
      return db.query('UPDATE utilisateur SET position_lat = $1, position_long = $2 WHERE id = $3', [utilisateur.query['lat'], utilisateur.query['long'], utilisateur.query['idUser']], callback);
    },
    /**
    *@method getDriver
    *@desc select id of the driver of a round
    *@param {number}idTour id of the round
    */
    getDriver: function(idTour, callback){
      return db.query('select id_user from voiture where id = (select id_voiture from tournee where id = $1)',[idTour], callback);
    },
    /**
    *@method getPosition
    *@desc select location of a user
    *@param {number}id id of the user
    */
    getPosition: function(id, callback){
      return db.query('Select position_lat, position_long, prenom from utilisateur where id = $1', [id], callback);
    },
    /**
    *@method getDataById
    *@desc select informations of a user according to his id
    *@param{number}id id of the user
    */
    getDataById: function(id, callback){
      return db.query('Select * from utilisateur where id = $1', [id], callback);
    },
    /**
    *@method updateUtilisateur
    *@desc update user table with new average rating, new ratings number according to the user id
    *@param{number}avr_rating
    *@param{number}nbr_ratings
    *@param{number}id id of the user
    */
    updateUtilisateur: function(utilisateur, callback){
      return db.query('UPDATE utilisateur SET avr_rating = $1, nbr_ratings= $2 WHERE id = $3', [utilisateur.avr_rating,utilisateur.nbr_ratings, utilisateur.id], callback);
    }
};

module.exports = Utilisateur;
