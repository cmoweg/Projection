var express = require('express');
var router = express.Router();
var fs = require('fs');
var bodyParser = require('body-parser');
var http = require('http');

const sequelize = require("sequelize");
var url = require('url');
var querystring = require('querystring');

router.use(express.json());

router.use(express.urlencoded( {extended : false } ));


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

  if(form == "all") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =? OR category =?";
    conn.query(sql, [2, 3], function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/project', {rows : rows, post : undefined, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "class") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 2, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/project', {rows : rows, post : undefined, "form" : "class", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "interest") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 3, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/project', {rows : rows, post : undefined, "form" : "interest", "authenticate": req.session.authenticate});
      }
    });
  }
}) 

router.get('/study', function (req, res, next) {
  res.redirect('/page/study/all');
});

router.get('/study/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);

  if(form == "all") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =? OR category =?";
    conn.query(sql, [0,1], function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/study', {rows : rows, post : undefined, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "class") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 0, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/study', {rows : rows, post : undefined, "form" : "class", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "interest") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 1, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/study', {rows : rows, post : undefined, "form" : "interest", "authenticate": req.session.authenticate});
      }
    });
  }
})

router.get('/program', function (req, res, next) {
  res.redirect('/page/program/all');
});

router.get('/program/:form', function (req, res, next) {
  let form = req.params.form;
  console.log(form);

  if(form == "all") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =? OR category =? OR category =? OR category =? OR category =?";
    conn.query(sql, [4, 5, 6, 7, 8], function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "tutoring") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 4, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "tutoring", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "contest") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 5, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "contest", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "creative_semester") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 6, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "creative_semester", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "creative_community") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 7, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "creative_community", "authenticate": req.session.authenticate});
      }
    });
  }
  else if(form == "hackathon") {
    var sql = "SELECT title, short_description, current_num, recruit_num FROM post WHERE category =?";
    conn.query(sql, 8, function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/program', {rows : rows, post : undefined, "form" : "hackathon", "authenticate": req.session.authenticate});
      }
    });
  }
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

 
  res.render('post/post', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position ,"authenticate": req.session.authenticate});
  
})


router.post('/:nav/:form/post/:id', function (req, res, next) {
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

  let title = req.body.title;
  console.log('제목: '+title);

  let sql="INSERT INTO post (author_id, category, public, recruit, create_date, title, short, class_info, subject, current_num, recruit_num, recruit_start_date,recruit_end_date, position, start_date, end_date, TBD, goal, attachment, description, image) VALUES(?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  let params = [11,0, true, true, Date.now(), '제목', '한줄', '학수번호001', '분야',3, 4,'2017-12-21','2017-12-21','포지션','2017-12-21','2017-12-21', true,'목표','첨부파일','상세설명','이미지'];


  res.render('post/post_detail', { "nav": nav, "form": form, "class_info": class_info, "subject": subject, "position": position ,"isWriter": true ,"authenticate": req.session.authenticate});
  
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



//프로그램 검색
router.get('/program_search/:form', function(req, res) {
  console.log('--- log start ---');
  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  var title_search = "%" + result + "%";
  console.log(result);
  console.log(parsedQuery);
  let form = req.params.form;
  var cate;
  if(form == "tutoring") {
    cate = 4;
  }
  else if(form == "contest") {
    cate = 5;
  }
  else if(form == "creative_semester") {
    cate = 6;
  }
  else if(form == "creative_community") {
    cate = 7;
  }
  else if(form == "hackathon") {
    cate = 8;
  }

  if(form == "all") {
    if(!result) {
      var sql = "SELECT * FROM post WHERE category =? OR category =? OR category =? OR category =? OR category =?";
      conn.query(sql, [4, 5, 6, 7, 8], function(err, rows, fields) {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/program', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
        }
      });
    }
  
    else {
      var sql = "SELECT * FROM post WHERE title LIKE ? AND (category =? OR category =? OR category =? OR category =? OR category =?)";
      conn.query(sql, [title_search, 4, 5, 6, 7, 8], function(err, rows, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/program', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
        }
      });
    }
  }
  else if(form == "tutoring" || form == "contest" || form == "creative_semester" || form == "creative_community" || form == "hackathon") {
    if(!result) {
      var sql = "SELECT * FROM post WHERE category =?";
      conn.query(sql, cate, function(err, rows, fields) {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/program', {rows : rows, "form" : form, "authenticate": req.session.authenticate});
        }
      });
    }
  
    else {
      var sql = "SELECT * FROM post WHERE category =? AND title LIKE ?";
      conn.query(sql, [cate, title_search], function(err, rows, fields){
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/program', {rows : rows, "form" : form, "authenticate": req.session.authenticate});
        }
      });
    }
  }
  console.log('--- log end ---');
})

//프로젝트 검색
router.get('/project_search/all', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  var title_search = "%" + result + "%";
  console.log(result);
  console.log(parsedQuery);
  if(!result) {
    var sql = "SELECT * FROM post WHERE category =? OR category =?";
    conn.query(sql, [2, 3], function(err, rows, fields) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/project', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  else {
    var sql = "SELECT * FROM post WHERE title LIKE ? AND (category =? OR category =?)";
    conn.query(sql, [title_search, 2, 3], function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/project', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  console.log('--- log end ---');
})

router.get('/project_search/class', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result1 = parsedQuery.num;
  var result2 = parsedQuery.div;
  var search = parsedQuery.search;
  var title_search = "%" + search + "%";
  console.log(result1);
  console.log(result2);
  console.log(search);
  console.log(parsedQuery);

  if(!result1) {
    if(!result2) {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =?";
        conn.query(sql, 2, function(err, rows, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND title LIKE ?";
        conn.query(sql, [2, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
    else {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_div =?";
        conn.query(sql, [2, result2], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_div =? AND title LIKE ?";
        conn.query(sql, [2, result2, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
  }
  else {
    if(!result2) {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =?";
        conn.query(sql, [2, result1], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE class_info_num =? AND title LIKE ?";
        conn.query(sql, [result1, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
    else {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =? AND class_info_div =?";
        conn.query(sql, [2, result1, result2], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =? AND class_info_div =? AND title LIKE ?";
        conn.query(sql, [2, result1, result2, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/project', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
  }
  console.log('--- log end ---');
})

router.get('/project_search/interest', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var select = parsedQuery.select;
  var search = parsedQuery.search;
  var title_search = "%" + search + "%";
  console.log(select);
  console.log(search);
  console.log(parsedQuery);

  if(select == 0) {
    if(!search) {
      var sql = "SELECT * FROM post WHERE category =?";
      conn.query(sql, 3, function(err, rows, fields) {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/project', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
    else {
      var sql = "SELECT * FROM post WHERE category =? AND title LIKE ?";
      conn.query(sql, [3, title_search], (err, rows, fields) => {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/project', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
  }
  else {
    if(!search) {
      var sql = "SELECT * FROM post WHERE category =? AND subject =?";
      conn.query(sql, [3, select], (err, rows, fields) => {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/project', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
    else {
      var sql = "SELECT * FROM post WHERE category =? AND subject =? AND title LIKE ?";
      conn.query(sql, [3, select, title_search], (err, rows, fields) => {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/project', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
  }

  console.log('--- log end ---');
})

//스터디 검색
router.get('/study_search/all', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result = parsedQuery.search;
  var title_search = "%" + result + "%";
  console.log(result);
  console.log(parsedQuery);
  if(!result) {
    var sql = "SELECT * FROM post WHERE category =? OR category =?";
    conn.query(sql, [0, 1], function(err, rows, fields) {
      if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/study', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }
  else {
    var sql = "SELECT * FROM post WHERE title LIKE ? AND (category =? OR category =?)";
    conn.query(sql, [title_search, 0, 1], function(err, rows, fields){
      if(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log(rows);
        res.render('page/study', {rows : rows, "form" : "all", "authenticate": req.session.authenticate});
      }
    });
  }

  console.log('--- log end ---');
})

router.get('/study_search/class', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var result1 = parsedQuery.num;
  var result2 = parsedQuery.div;
  var search = parsedQuery.search;
  var title_search = "%" + search + "%";
  console.log(result1);
  console.log(result2);
  console.log(search);
  console.log(parsedQuery);

  if(!result1) {
    if(!result2) {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =?";
        conn.query(sql, 0, function(err, rows, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND title LIKE ?";
        conn.query(sql, [0, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
    else {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_div =?";
        conn.query(sql, [0, result2], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_div =? AND title LIKE ?";
        conn.query(sql, [0, result2, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
  }
  else {
    if(!result2) {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =?";
        conn.query(sql, [0, result1], function(err, rows, fields){
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =? AND title LIKE ?";
        conn.query(sql, [0, result1, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
    else {
      if(!search) {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =? AND class_info_div =?";
        conn.query(sql, [0, result1, result2], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
      else {
        var sql = "SELECT * FROM post WHERE category =? AND class_info_num =? AND class_info_div =? AND title LIKE ?";
        conn.query(sql, [0, result1, result2, title_search], (err, rows, fields) => {
          if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
          } else {
            console.log(rows);
            res.render('page/study', {rows : rows, "form" : "class", "authenticate": req.session.authenticate});
          }
        });
      }
    }
  }

  console.log('--- log end ---');
})

router.get('/study_search/interest', function(req, res) {
  console.log('--- log start ---');

  var parsedUrl = url.parse(req.url);
  var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
  var select = parsedQuery.select;
  var search = parsedQuery.search;
  var title_search = "%" + search + "%";
  console.log(select);
  console.log(search);
  console.log(parsedQuery);

  if(select == 0) {
    if(!search) {
      var sql = "SELECT * FROM post WHERE category =?";
      conn.query(sql, 1, function(err, rows, fields) {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/study', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
    else {
      var sql = "SELECT * FROM post WHERE category =? AND title LIKE ?";
      conn.query(sql, [1, title_search], (err, rows, fields) => {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/study', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
  }
  else {
    if(!search) {
      var sql = "SELECT * FROM post WHERE category =? AND subject =?";
      conn.query(sql, [1, select], (err, rows, fields) => {
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/study', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
    else {
      var sql = "SELECT * FROM post WHERE category =? AND subject =? AND title LIKE ?";
      conn.query(sql, [1, select, title_search], (err, rows, fields) => {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        } else {
          console.log(rows);
          res.render('page/study', {rows : rows, "form" : "interest", "authenticate": req.session.authenticate});
        }
      });
    }
  }
  
  console.log('--- log end ---');
})