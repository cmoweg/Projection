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

router.get('/project/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  res.render('page/project', { "form": form });
})

router.get('/study', function (req, res, next) {
  res.redirect('/study/all');
});

router.get('/study/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  res.render('page/study', { "form": form });
})

router.get('/program', function (req, res, next) {
  res.redirect('/program/all');
});

router.get('/program/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  res.render('page/program', { "form": form });
})

router.get('/post/:nav/:form', function (req, res, next) {
  let nav = req.params.nav;
  let form = req.params.form;
  console.log(nav)
  let class_info = true;
  let subject = true;
  let position = true;

  if (nav == "project" && form == "interest") {
    class_info = false;
  }
  else if (nav == "study") {
    position = false;

    if (form == "interest") {
      class_info = false;
    }
  }
  else if (nav == "dodream") {
    if (form == "tutoring") {
      subject = false;
    }
    else if (form == "contest" || form == "creative" || form == "creative_team") {
      class_info = false;
    }
  }
  console.log(class_info, subject, position);
  res.render('post/post', { "class_info": class_info, "subject": subject, "position": position });
})


router.get('/post_detail/:nav/:form', function (req, res, next) {
  let nav = req.params.nav;
  let form = req.params.form;
  console.log(nav)
  let class_info = true;
  let subject = true;
  let position = true;


  if (nav == "project" && form == "interest") {
    class_info = false;
  }
  else if (nav == "study") {
    position = false;

    if (form == "interest") {
      class_info = false;
    }
  }
  else if (nav == "dodream") {
    if (form == "tutoring") {
      subject = false;
    }
    else if (form == "contest" || form == "creative" || form == "creative_team") {
      class_info = false;
    }
  }
  console.log(class_info, subject, position);
  res.render('post/post_detail', { "class_info": class_info, "subject": subject, "position": position, "isWriter": false });
})
module.exports = router;
