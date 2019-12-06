
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
let User = require('./user');
let Trajet = require('./trajet');
let Tournee = require('./tournee');
let TrajetOnly = require('./trajetonly');
let Car = require('./car');

var jwt = require('jsonwebtoken');
var db = require("./config/config.js");


var app = express();
app.use(cors({origin: "*"}));
app.use(bodyParser.json({type : '*/*'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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

 app.post('/trajetOnly', function(req, res){
   TrajetOnly.getTrajetOnly(req, function(err, result){
     console.log(req.body.idUser);
     console.log('err: '+err);
     if(err){
       res.status(400).json(err);
       console.log("Erreur");
     }else{
       res.json(result.rows);
     }
     console.log("getting  Only trajet in node!");
   });
 });

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

app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})
