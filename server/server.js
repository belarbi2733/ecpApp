
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

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

app.listen(8080, ()=>{
    console.log("Starting server, and watching 8080...");
})
