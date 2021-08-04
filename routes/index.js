var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router; 

router.get('/post/:nav/:form', function(req, res, next){
  let nav = req.params.nav;
  let form = req.params.form;
  console.log(nav)
  let class_info = true;
  let subject = true;
  let position =true;

  if(nav=="project" && form == "interest"){
    class_info=false;
  }
  else if(nav=="study"){
    position=false;

    if(form == "interest"){
      class_info=false;
    }
  }
  else if(nav=="dodream"){
    if(form=="tutoring"){
      subject = false;
    }
    else if(form == "contest" || form=="creative" || form=="creative_team"){
      class_info=false;
    }
  }
  console.log(class_info, subject, position);
  res.render('post/post', {"class_info":class_info, "subject":subject, "position":position});
})


router.get('/post_detail/:nav/:form', function(req, res, next){
  let nav = req.params.nav;
  let form = req.params.form;
  console.log(nav)
  let class_info = true;
  let subject = true;
  let position =true;


  if(nav=="project" && form == "interest"){
    class_info=false;
  }
  else if(nav=="study"){
    position=false;

    if(form == "interest"){
      class_info=false;
    }
  }
  else if(nav=="dodream"){
    if(form=="tutoring"){
      subject = false;
    }
    else if(form == "contest" || form=="creative" || form=="creative_team"){
      class_info=false;
    }
  }
  console.log(class_info, subject, position);
  res.render('post/post_detail', {"class_info":class_info, "subject":subject, "position":position, "isWriter":false});
})