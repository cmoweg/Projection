var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

  // https://stackoverflow.com/a/10011078
  var obj = JSON.parse(fs.readFileSync('data/post_intro.json', 'utf8'));
  res.render('index/index', { "post_intro": obj, "authenticate": req.session.authenticate });
});


module.exports = router;

let mysql = require('mysql'); // mysql 모듈 추가
var url = require('url');
var querystring = require('querystring');
const app = require('../app');

var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'hani1735',
  database:'projection'
});

router.get('/all_search', function(req, res) {
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
