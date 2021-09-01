var express = require('express');
const mysql = require('mysql');
const dbconfig = require('../config/mysql.js');
const { smtpTransport, generateRandom } = require('../config/email');



const conn = mysql.createConnection(dbconfig);
var router = express.Router();



/* GET home page. */

router.get('/login', function (req, res, next) {
  res.render('reg/login', { "authenticate": req.session.authenticate });
})

router.post('/login', function (req, res, next) {
  var userinfo;
  var sql = 'SELECT * FROM user WHERE email=? AND password=?';
  var params = [req.body.email, req.body.pw];

  console.log(params)
  conn.query(sql, params, function (err, rows, fields) {//두번째 인자에 배열로 된 값을 넣어줄 수 있다.
    if (err) {
      console.log(err);
      res.redirect('/account/login');
    } else {
      if (rows[0].email == req.body.email && rows[0].password == req.body.pw) {

        req.session.displayName = rows[0].nickname;

        req.session.authenticate = true;

        req.session.save(() => {
          res.redirect('/');
        });
      }
      else {
        res.redirect('/account/login');
      }
    }
  })

})


router.get('/registration', function (req, res, next) {
  res.render('reg/registration', { "isLogin": false, "authenticate": req.session.authenticate });
})

router.post('/registration', function (req, res, next) {

  const number = generateRandom(111111, 999999)
  const sendEmail = req.body.email // req.body;
  console.log(sendEmail)
  const mailOption = {
    from: "oyr.projection@gmail.com",
    to: sendEmail,
    subject: "[Projection]가입 인증 번호",
    text: "오른쪽 숫자 6자리를 입력해주세요 : " + number
  };




  smtpTransport.sendMail(mailOption, function (error, info) {
    if (error) {
      console.log('에러 ' + error);
    }
    else {
      console.log('전송 완료 ' + info.response);
      res.status(200).send({ message: "Mail send", message_id: info.message_id })

    }
  });

  // let sql = "INSERT INTO user (email, password, nickname) VALUES(?,?,?)"

  // let params = ['lhd0426@sju.ac.kr', '111111', "현동"]

  // conn.query(sql, params, function (err, rows, fields) {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send("Internal Server Error")
  //   }
  //   else {
  //     res.send(rows);
  //   }
  // })

  // res.render('reg/registration', { "isLogin": false, "authenticate": req.session.authenticate });
})



router.get('/logout', function (req, res, next) {
  // delete req.session.displayName;
  // delete req.session.isLogin;
  // req.session.save(() => {
  //   res.redirect('/');
  // });

  if (req.session) {
    req.session.destroy(function (err) { });
    res.redirect('/');
  }
})



router.get('/find_pw', function (req, res, next) {
  res.render('reg/find_pw', { "isLogin": false, "authenticate": req.session.authenticate });
})

router.get('/update_user', function (req, res, next) {
  res.render('reg/update_user', { "isLogin": false, "authenticate": req.session.authenticate });
})

module.exports = router;
