var express = require('express');
var router = express.Router();
var fs = require('fs');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function (req, res, next) {

  // https://stackoverflow.com/a/10011078
  var obj = JSON.parse(fs.readFileSync('data/post_intro.json', 'utf8'));
  res.render('index/index', { "post_intro": obj, "isLogin": false });
});

module.exports = router;
