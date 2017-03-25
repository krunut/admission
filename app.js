var express = require('express')
var https = require('https');
var http = require('http');
var fs = require("fs");
var path = require('path');
var favicon = require('serve-favicon');
var crypto = require('crypto');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var upload = multer();
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})
app.use(express.static('public'))

// HTTPS
var secureServer = https.createServer({
	key: fs.readFileSync(__dirname + '/ssl.key'),
	cert: fs.readFileSync(__dirname + '/ssl.crt')
}, app).listen(443, function () {
	console.log('Smart IoT Platform Web Application - HTTPS on ' + secureServer.address().port);
});

var insecureServer = http.createServer(app).listen(80, function() {
	console.log('Smart IoT Platform Web Application - HTTP on ' + insecureServer.address().port);
})
