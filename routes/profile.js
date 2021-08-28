var express = require('express');
var router = express.Router();


router.get('/edit', function (req, res, next) {

  res.render('profile/profile_edit.html', { "authenticate": req.session.authenticate });
});

router.get('/other', function (req, res, next) {
  res.render('profile/profile_other.html');
});

router.get('/my', function (req, res, next) {


  res.render('profile/profile.html', { "authenticate": req.session.authenticate });
});

module.exports = router;
