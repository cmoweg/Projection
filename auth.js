const express = require("express")
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session)
const bodyParser = require("body-parser")



var app = express();



app.use(bodyParser.urlencoded({ extended: false }))