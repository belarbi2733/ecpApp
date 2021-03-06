var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const http = require("http");
const fs = require("fs");


let User = require('./user');
let Trajet = require('./trajet');
let Tournee = require('./tournee');
let Car = require('./car');
let Colis = require('./colis');


var jwt = require('jsonwebtoken');
var db = require("../config/config.js");


/**
*express server
*/
var app = express();

app.use(cors({origin: "*"}));
app.use(bodyParser.json({type : '*/*'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//function that is not usefull in the app but has to be implement in the website
app.get('/code', function(req, res){
  function randomString( len ) {
    var str = "";                                         // String result
    for(var i=0; i<len; i++){                             // Loop `len` times
      var rand = Math.floor( Math.random() * 62 );        // random: 0..61
      var charCode = rand+= rand>9? (rand<36?55:61) : 48; // Get correct charCode
      str += String.fromCharCode( charCode );             // add Character to str
    }
    return str;       // After all loops are done, return the concatenated string
  }

  res.json(  randomString(10)); // "7GL9F0ne6t"
  console.log("code here in node! ");
});

//////////////////////////METHODES OF USER///////////////////////////////
/**
*@method position
*@desc get method to set the location of a user into the database
*@see addPosition
*@param {string}lat
*@param {string}long
*@param {number}idUser id of the user
*/
app.get('/position', (req, res)=>{
    let lat = req.query['lat'];
    let long = req.query['long'];
    let idUser = req.query['idUser'];
    console.log(lat+ '\t'+ long+ '\t' + idUser);
    User.addPosition(req, function(err, result){
      console.log('err: '+err);
      if(err) {
        res.status(400).json(err);
        console.log("Erreur");
      }
      else {
        // console.log(result);
        res.send(true);
      }
      console.log("adding position in node!");
    });
});

/**
*@method getDriver
*@desc post method to know who is the driver of a round
*@see getDriver
*@param {number}idTour id of the round
*/
app.post('/getDriver', function(req, res){
  let idTour = req.body.idTour;
  User.getDriver(idTour, function(err, result){
    console.log('err:' + err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }
    else{
      if(result.rows.length !== 0) {
        console.log("getIdDriver Ok : " + result.rows[0].id_user);
        res.json(result.rows[0].id_user);
      }
    }
    console.log("get driver id in node!");
  });
});

/**
*@method getPosition
*@desc post method to get the location of a user
*@see getPosition
*@param {number}id id of the user
*/
app.post('/getPosition', function(req, res){
  let id = req.body.idUser;
  User.getPosition(id, function(err, result){
    console.log('err:' + err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }
    else{
      console.log("getPosition : " + result.rows[0].position_lat + " - " + result.rows[0].position_long);
      res.json(result.rows);
    }
    console.log("get position in node!");
  });
});

/**
*@method rating
*@desc get method to compute the new average rating of a user and update the data base with it
*@see getDataById
*@see updateUtilisateur
*@param{number}id id of the user
*@param{number}rating new rating that must be compute
*/
app.get('/rating' , (req,res)=> {
  let idUser = req.query['idUser'];
  console.log("idUser" + idUser)
  let rating = req.query['rating'];
  console.log("rating: "+ rating);
  User.getDataById(idUser, function(err, result) {
    if(err) {
      res.status(400).json(err);
    }
    else
    {
      const userData = result.rows[0];
      let newNote = rating; /*Instance new note from mobile app*/
      let avrRating = userData.avr_rating;
      let nbrRatings = userData.nbr_ratings;
      console.log("rating info : "+newNote + "-" + avrRating + "-" + nbrRatings  )
      let newRating=0;
      console.log("newrating : "+newRating  )
      newRating= (avrRating*nbrRatings);
      console.log("newrating 2: "+newRating  )

      newRating = (newRating-0)+(newNote-0);
      console.log("newrating 3: "+newRating  )

      newRating = newRating/(nbrRatings+1);
      //newRating = ((avrRating*nbrRatings)+newNote)/(nbrRatings+1);
      console.log("newrating 4: "+newRating  )

      newRating = newRating.toFixed(2); /* Round the result to 2 decimal */
      userData.avr_rating = newRating;
      userData.nbr_ratings = nbrRatings + 1;
      result.rows[0] = userData ;
      console.log("newrating 5 : "+newRating  )

      User.updateUtilisateur(result.rows[0], function(err, result){
        if(err){
          res.status(400).json;
        }
        else{
          res.send(true);
        }
      });
    }
  });
  console.log("sending new rating in node")
});

/**
*@method login
*@desc post method to compare the user mail to the mail from the data base and validate the login
*@see getUtilisateur
*@param {string} mail
*/
app.post('/login', function (req,res) {
  User.getUtilisateur(req, function (err, result) {
    console.log('err : ' + err);
    if (err) {
      res.status(400).json(err);
      console.log("Erreur");
    } else {
      if(result.rows.length !== 0) { // Check si il y a le mail dans la database
        if (result.rows[0].password === req.body.password) { //Check si les mots de passes correspondent
          res.send(true);
        }
      }
      else {
        res.json(false);
      }
    }
    console.log("getting user in node!");
  });
});

/**
*@method getUserId
*@desc post method to get the id of a user by his mail
*@see getIdUtilisateurByMail
*@param {string}mail
*/
app.post('/getUserId', function (req,res) {
  User.getIdUtilisateurByMail(req.body.mail, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getId");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getId Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});


//////////////////////////METHODES OF TRAJET///////////////////////////////
/**
*@method comment
*@desc get method to send message to the data base
*@see setComment
*@param {string}comment the message that the user send to the admin
*@param {number}id id of the ride
*/
app.get('/comment', (req, res)=>{
  let comment = req.query['comment'];
  console.log("comment" + comment)
  let id = req.query['id'];
  console.log("id: "+ id);
  Trajet.setComment(req, function(err, result){
    console.log('err: '+err);
    if(err){
      res.statut(400).json(err);
      console.log("erreur");
    }
    else{
      res.send(true);
    }
    console.log("Send comment in node!")
  });
});

/**
*@method validate
*@desc post method to validate the ride in the data base
*@see validateStatus
*@param {nummber}id id of the ride
*/
app.post('/validate', function(req, res){
  console.log("Id "+req.body.id)
  Trajet.validateStatus(req.body.id, function(err, result){
    console.log('err:' + err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }
    else{
      res.send(true);
    }
    console.log("Validate status in node!");
  });
});

/**
*@method getCode
*@desc post method to get the code from a ride
*@see getCode
*@param {number}id id of the ride
*/
app.post('/getCode', function(req, res){
  Trajet.getCode(req, function(err, result){
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      if(result.rows.length !== 0){
        console.log("getCode Ok : " + result.rows[0].code);
        res.json(result.rows[0].code);
      }
    }
    console.log("codeDBB here in node! ");
  });
});

/**
*@method checkCode
*@desc post method that compare the code scan to the code from the data base
*@see getCode
*@param {number}id id of the ride
*/
app.post('/checkCode', function(req, res){
  Trajet.getCode(req, function(err, result){
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      if(result.rows.length !== 0){
        if(result.rows === req.body.code){
          res.send(true);
        }
      }
      else {
        res.json(false);
      }
    }
    console.log("codeDBB here in node! ");
  });
});

/**
*@method trajetColis
*@desc post method to get rides informations of a ride that has a package
*@see getTrajetColis
*@param {number}idColis
*/
app.post('/trajetColis', function(req, res){
  Trajet.getTrajetColis(req.body.idColis, function(err, result){
    console.log(req.body.idColis);
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      res.json(result.rows);
    }
    console.log("getting trajectColis in node!");
  });
});

/**
*@method trajet
*@desc post method to get ride informations of a user
*@see getTrajet
*@param {number}idUser
*/
 app.post('/trajet', function(req, res){
   Trajet.getTrajet(req, function(err, result){
     console.log(req.body.idUser);
     console.log('err: '+err);
     if(err){
       res.status(400).json(err);
       console.log("Erreur");
     }else{
       res.json(result.rows);
     }
     console.log("getting traject in node!");
   });
 });

 /**
 *@method trajetAll
 *@desc post method to get rides inforamtions of a ride that is into a specific round
 *@see getTrajetAll
 *@param {number}idTour
 */
 app.post('/trajetAll', function(req, res){
   Trajet.getTrajetAll(req, function(err, result){
     console.log(req.body.idTour);
     console.log('err: '+err);
     if(err){
       res.status(400).json(err);
       console.log("Erreur");
     }else{
       res.json(result.rows);
     }
     console.log("getting trajectAll in node!");
   });
 });

 /**
 *@method trajetConduct
 *@desc post method to get rides that are related to a driver by the ride id
 *@see getTrajetConduct
 *@param {number}id id of a ride
 */
 app.post('/trajetConduct', function(req, res){
   Trajet.getTrajetConduct(req, function(err, result){
     console.log(req.body.idTour);
     console.log('err: '+err);
     if(err){
       res.status(400).json(err);
       console.log("Erreur");
     }else{
       res.json(result.rows);
     }
     console.log("getting trajectconduct in node!");
   });
 });


//////////////////////////METHODES OF TOURNEE///////////////////////////////
/**
*@method tournee
*@desc post method to get round informations of a driver
*@see getTournee
*@param {number}idUser
*/
app.post('/tournee', function(req, res){
  Tournee.getTournee(req, function(err, result){
    console.log(req.body.idUser);
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      res.json(result.rows);
    }
    console.log("getting tournee in node!");
  });
});


//////////////////////////METHODES OF COLIS///////////////////////////////
/**
*@method colis
*@desc post method to get package informations
*@see getColis
*@param {number}idColis
*/
app.post('/colis', function(req, res){
  Colis.getColis(req, function(err, result){
    console.log(req.body.idColis);
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      res.json(result.rows);
    }
    console.log("getting colis in node!");
  });
});

/**
*@method colisonly
*@desc get method to get informations about the transfer of a package of a user that do not travel with his package
*@see getColisOnly
*@param {number}id id of the owner of the package
*/
app.post('/colisonly', function(req, res){
  console.log(req.body.idUser)
  Colis.getColisOnly(req.body.idUser, function(err, result){
    console.log('err: '+err);
    if(err){
      res.status(400).json(err);
      console.log("Erreur");
    }else{
      res.json(result.rows);
    }
    console.log("getting colisOnly in node!");
  });
});


//////////////////////////METHODES OF CAR///////////////////////////////
/**
*@method getIdCar
*@desc post method to get the car id of a user
*@see getIdCar
*@param {number}idUser
*/
app.post('/getIdCar', function(req, res){
  Car.getIdCar(req, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getIdCar");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getIdCar Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})
