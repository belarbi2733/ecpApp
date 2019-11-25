var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.user(bodyParser.json());
var User = require('./models/user');

//fonction relatives à l'utilisateur (inscription, ...)

module.exports = router;
