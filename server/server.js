
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

app.post('/getIdColis', function(req, res){
  Trajet.getIdColis(req, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getIdColis");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getIdColis Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

app.post('/getTourneeId', function(req, res){
  Trajet.getTourneeId(req, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getTourneeId");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getTourneeId Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

app.post('/getIdTournee', function(req, res){
  Tournee.getIdTournee(req, function (err, result) {
    if(err) {
      res.status(400).json(err);
      console.log("Erreur in getId Tournee");
    }
    else {
      if(result.rows.length !== 0) {
        console.log("getId Tournee Ok : " + result.rows[0].id);
        res.json(result.rows[0].id);
      }
    }
  })
});

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
   Trajet.getTrajetOnly(req, function(err, result){
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

 app.post('/tourneeAll', function(req, res){
   Tournee.getTourneeAll(req, function(err, result){
     console.log(req.body.idTour);
     console.log('err: '+err);
     if(err){
       res.status(400).json(err);
       console.log("Erreur");
     }else{
       res.json(result.rows);
     }
     console.log("getting tourneeAll in node!");
   });
 });


app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})
