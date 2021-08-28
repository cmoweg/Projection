var express = require('express');
var router = express.Router();
var fs = require('fs');
const readXlsxFile = require('read-excel-file/node');
var http = require('http');

const sequelize = require("sequelize");
let mysql = require('mysql'); // mysql 모듈 추가
var db = require('../config/mysql');
var url = require('url');
var querystring = require('querystring');
const app = require('../app');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'hani1735',
  database:'projection'
});
conn.connect();
module.exports = conn;

router.get('/project', function (req, res, next) {
  res.redirect('/page/project/all');
});

router.get('/project/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  var obj = JSON.parse(fs.readFileSync('data/post_list.json', 'utf8'));

  res.render('page/project', { "form": form, "post_list": obj, "authenticate": req.session.authenticate });
}) 

router.get('/study', function (req, res, next) {
  res.redirect('/page/study/all');
});

router.get('/study/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);
  var obj = JSON.parse(fs.readFileSync('data/post_list.json', 'utf8'));
  res.render('page/study', { "form": form, "post_list": obj, "authenticate": req.session.authenticate });
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



//프로그램 검색
router.get('/program_search/:form', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  console.log(result);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE title LIKE '%result%'";
  var params = result;
  conn.query(sql, params, (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        title: result
      });
    }
  });

  console.log('--- log end ---');
})

//프로젝트 검색
router.get('/project_search/all', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  console.log(result);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE title LIKE '%result%'";
  var params = result;
  conn.query(sql, params, (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        title: result
      });
    }
  });

  console.log('--- log end ---');
})

router.get('/project_search/class', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result1 = parsedQuery.num;
  var result2 = parsedQuery.div;
  var result = result1 + result2;
  var search = parsedQuery.search;
  console.log(result1);
  console.log(result2);
  console.log(search);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE class_info_num =? AND class_info_div =? AND title =?";
  conn.query(sql, [result1, result2, `%search%`], (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        class_info_num: result1,
        class_info_div: result2,
        title: search
      });
    }
  });
  console.log('--- log end ---');
})

router.get('/project_search/interest', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var select = parsedQuery.select;
  var search = parsedQuery.search;
  console.log(select);
  console.log(search);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE subject =? AND title =?";
  conn.query(sql, [select, `%search%`], (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        subject: select,
        title: search
      });
    }
  });

  console.log('--- log end ---');
})

//스터디 검색
router.get('/study_search/all', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  console.log(result);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE title LIKE '%result%'";
  var params = result;
  conn.query(sql, params, (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        title: result
      });
    }
  });

  console.log('--- log end ---');
})

router.get('/study_search/class', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result1 = parsedQuery.num;
  var result2 = parsedQuery.div;
  var result = result1 + result2;
  var search = parsedQuery.search;
  console.log(result1);
  console.log(result2);
  console.log(search);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE class_info_num =? AND class_info_div =? AND title =?";
  conn.query(sql, [result1, result2, `%search%`], (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        class_info_num: result1,
        class_info_div: result2,
        title: search
      });
    }
  });

  console.log('--- log end ---');
})

router.get('/study_search/interest', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  console.log(parsedUrl);

  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var select = parsedQuery.select;
  var search = parsedQuery.search;
  console.log(select);
  console.log(search);
  console.log(parsedQuery);

  var sql = "SELECT * FROM post WHERE subject =? AND title =?";
  conn.query(sql, [select, `%search%`], (err, rows, fields) => {
    if(err) {
      console.log(err);
    } else {
      console.log('rows', rows);
      return res.json( {
        subject: select,
        title: search
      });
    }
  });
  
  console.log('--- log end ---');
})