var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

  // https://stackoverflow.com/a/10011078
  var obj = JSON.parse(fs.readFileSync('data/post_intro.json', 'utf8'));
  res.render('index/index', { "post_intro": obj, "isLogin": false });
});

router.get('/login', function (req, res, next) {
  res.render('reg/login', { "isLogin": false });
})

router.get('/registration', function (req, res, next) {
  res.render('reg/registration', { "isLogin": false });
})

router.get('/find_pw', function (req, res, next) {
  res.render('reg/find_pw', { "isLogin": false });
})

router.get('/update_user', function (req, res, next) {
  res.render('reg/update_user', { "isLogin": false });
})


module.exports = router;
