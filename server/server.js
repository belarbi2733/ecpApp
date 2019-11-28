
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
let User = require('./user');

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
    console.log(req.body);
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

app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})
