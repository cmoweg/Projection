var express = require('express');
const mysql = require('mysql');
const { smtpTransport, generateRandom } = require('../config/email');



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '111111',
  database: 'projection_db'
});
var router = express.Router();



/* GET home page. */

router.get('/login', function (req, res, next) {
  res.render('reg/login', { "authenticate": req.session.authenticate });
})

router.post('/login', function (req, res, next) {
  var userinfo = {
    user_id: "hyun@sju.ac.kr",
    user_pw: "111111",
    displayName: "hyun"
  };
  var uid = req.body.email;
  var upwd = req.body.pw;

  if (uid === userinfo.user_id && upwd === userinfo.user_pw) {
    req.session.displayName = userinfo.displayName;
    req.session.authenticate = true;

    req.session.save(() => {
      res.redirect('/');
    });
  }
  else {
    res.redirect('/account/login');
  }


})


router.get('/registration', function (req, res, next) {
  res.render('reg/registration', { "isLogin": false, "authenticate": req.session.authenticate });
})

router.post('/registration', function (req, res, next) {


  const number = generateRandom(111111, 999999)
  const sendEmail = "lhd0426@sju.ac.kr" // req.body;
  console.log(sendEmail)
  const mailOption = {
    from: "dtddla@naver.com",
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
