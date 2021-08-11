var express = require('express');
var router = express.Router();


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

module.exports = router;




// 글 작성


router.get('/:nav/:form/post/write', function (req, res, next) {
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
    else if (nav == "program") {
      if (form == "tutoring") {
        subject = false;
      }
      else if (form == "contest" || form == "creative_semester" || form == "creative_community") {
        class_info = false;
      }
    }
  
    res.render('post/post', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position });
  })
  
  
  router.get('/:nav/:form/post/:id', function (req, res, next) {
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
    else if (nav == "program") {
      if (form == "tutoring") {
        subject = false;
      }
      else if (form == "contest" || form == "creative_semester" || form == "creative_community") {
        class_info = false;
      }
    }
  
    res.render('post/post_detail', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position, "isWriter": false });
  })