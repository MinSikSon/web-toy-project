// *** 사용되지 않는 page ***

var express = require('express');
var router = express.Router();
var template = require('../lib/template');

/* GET home page. */

router.get('/', function(req, res, next){
  var title = `
    main
  `;
  var body = `
    <li>
    </li>
  `;
  res.send(template.HTML('',title,body,''));
  // next();
});

module.exports = router;
