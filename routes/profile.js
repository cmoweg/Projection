var express = require('express');
var router = express.Router();


router.get('/edit', function (req, res, next) {
  var context = require('../config/context')
  res.render('profile/profile_edit.html', context);
});

router.get('/other', function (req, res, next) {
  res.render('profile/profile_other.html');
});

router.get('/my', function (req, res, next) {
  var context = require('../config/context')

  res.render('profile/profile.html', context);
});

module.exports = router;
