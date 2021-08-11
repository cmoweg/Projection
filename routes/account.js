var express = require('express');
var router = express.Router();

/* GET home page. */

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
