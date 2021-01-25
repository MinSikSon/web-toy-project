// *** 사용되지 않는 page ***

var express = require('express');
var router = express.Router();
var template = require('../lib/template');

/* GET home page. */

router.get('/', function(req, res, next){

  // res.sendFile('../public/index.html')
  // next();
});

module.exports = router;
