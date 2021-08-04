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

router.get('/profile/edit', function (req, res, next) {
  res.render('profile/profile_edit.html');
});

router.get('/profile/other', function (req, res, next) {
  res.render('profile/profile_other.html');
});

router.get('/profile/my', function (req, res, next) {
  res.render('profile/profile.html');
});

router.get('/project', function (req, res, next) {
  res.redirect('/project/all');
});

router.get('/project/:form', function(req, res, next) {
  let form = req.params.form;
  console.log(form);
  res.render('page/project', {"form":form});
}) 

router.get('/study', function (req, res, next) {
  res.redirect('/study/all');
});

router.get('/study/:form', function(req, res, next) {
  let form = req.params.form;
  console.log(form);
  res.render('page/study', {"form":form});
}) 

router.get('/program', function (req, res, next) {
  res.redirect('/program/all')
});

router.get('/program/:category', function (req, res, next) {
  res.render('page/program');
});

