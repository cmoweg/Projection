var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

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

