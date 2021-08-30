var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));



let mysql = require('mysql'); // mysql 모듈 추가
const dbconfig = require('../config/mysql.js');

let conn = mysql.createConnection( // DB 정보 추가
  dbconfig
);




router.get('/project', function (req, res, next) {
  res.redirect('/page/project/all');
});

router.get('/project/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  var obj = JSON.parse(fs.readFileSync('data/post_list.json', 'utf8'));

  res.render('page/project', { "form": form, "post_list": obj ,"authenticate": req.session.authenticate});
})

router.get('/study', function (req, res, next) {
  res.redirect('/page/study/all');
});

router.get('/study/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  var obj = JSON.parse(fs.readFileSync('data/post_list.json', 'utf8'));

  res.render('page/study', { "form": form, "post_list": obj ,"authenticate": req.session.authenticate});
})

router.get('/program', function (req, res, next) {
  res.redirect('/page/program/all');
});

router.get('/program/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  var obj = JSON.parse(fs.readFileSync('data/post_list.json', 'utf8'));
  res.render('page/program', { "form": form, "post_list": obj, "authenticate": req.session.authenticate });
})

module.exports = router;




// 글 작성


router.get('/:nav/:form/post/write', function (req, res, next) {
  let nav = req.params.nav;
  let form = req.params.form;
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

 
  res.render('post/post', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position ,"authenticate": req.session.authenticate});
  
})


router.post('/:nav/:form/post/:id', function (req, res, next) {
  let nav = req.params.nav;
  let form = req.params.form;
  let class_info_ = true;
  let subject_ = true;
  let position_ = true;

  if (nav == "project" && form == "interest") {
    class_info_ = false;
  }
  else if (nav == "study") {
    position_ = false;

    if (form == "interest") {
      class_info_ = false;
    }
  }
  else if (nav == "program") {
    if (form == "tutoring") {
      subject_ = false;
    }
    else if (form == "contest" || form == "creative_semester" || form == "creative_community") {
      class_info_ = false;
    }
  }

  var category;
  if(nav == "project"){
    if(form == "class"){
      category=0;
    }
    else if(form == "interest"){
      category = 1;
    }
  }
  else if(nav == "study"){
    if(form == "class"){
      category=2;
    }
    else if(form == "interest"){
      category = 3;
    }
  }
  else if(nav=="program"){
    if(form == "tutoring"){
      category = 4;
    }
    else if(form=="contest"){
      category = 5;
    }
    else if(form=="creative_semester"){
      category = 6;
    }
    else if(form=="creative_community"){
      category = 7;
    }
    else if(form=="hackathon"){
      category = 8;
    }
  }


  var title= req.body.title;
  var short_description = req.body.short_description;
  var class_info;
  if(class_info_ == true){
    class_info = req.body.class_name + req.body.class_num;
  }
  var subject= req.body.subject;
  var current_num = req.body.current_num;
  var recruit_num = req.body.recruit_num;
  var recruit_start_date = req.body.recruit_start_date;
  var recruit_end_date = req.body.recruit_end_date;
  var position = req.body.position;
  var start_date = req.body.start_date;
  var end_date = req.body.end_date;
  var TBD = req.body.TBD;
  if(TBD=="on"){
    TBD = true;
  }
  else{
    TBD = false;
  }
  var goal = req.body.goal;
  var attachment = req.body.attachment;
  var description = req.body.description;
  var image = req.body.image;
  var date = new Date();


  let sql="INSERT INTO post (author_id, category, public, recruit, create_date, title, short, class_info, subject, current_num, recruit_num, recruit_start_date,recruit_end_date, position, start_date, end_date, TBD, goal, attachment, description, image) VALUES(?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let params = [8,category, true, true, date, title, short_description, class_info, subject,current_num, recruit_num,recruit_start_date,recruit_end_date,position,start_date,end_date, TBD,goal,attachment,description,image];
  // author_id 제대로 받기


  conn.query(sql, params, function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      console.log('성공!');
    }
  })


  res.render('post/post_detail', { "nav": nav, "form": form, "class_info": class_info_, "subject": subject_, "position": position_ ,"isWriter": true ,"authenticate": req.session.authenticate});
  
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


  
    res.render('post/post_detail', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position, "isWriter": false ,"authenticate": req.session.authenticate});
  })


  
router.get('/add', function(req, res){
  let sql="INSERT INTO user (email, password, nickname, major, year, position, phone, is_public, skill, portfolio, project, award, license, introduction) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let params = ['이_메-일@naver.com', '비밀번호', '별명', '전공',3,'포지션','010 1234 1234', true, '스킬','포트폴리오 링크', '프로젝트','수상내역','자격증','자기소개'];
  conn.query(sql, params, function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      res.send(rows);
    }
  })
})

router.get('/show', function(req, res){
  let sql='SELECT * from user';

  conn.query(sql, function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      res.send(rows);
    }
  })
})

router.get('/add_', function(req, res){
  let sql="INSERT INTO post (author_id, category, public, recruit, create_date, title, short, class_info, subject, current_num, recruit_num, recruit_start_date,recruit_end_date, position, start_date, end_date, TBD, goal, attachment, description, image) VALUES(?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let params = [3,0, true, true, '2017-12-21 12:16:14', '제목', '한줄', '학수번호001', '분야',3, 4,'2017-12-21','2017-12-21','포지션','2017-12-21','2017-12-21', true,'목표','첨부파일','상세설명','이미지'];
  conn.query(sql, params, function(err, rows, fields){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    else{
      res.send(rows);
    }
  })
})
