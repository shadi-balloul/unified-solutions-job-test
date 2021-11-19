var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var http = require('http'); 
var fs = require('fs');

//mongoose.set('useCreateIndex', true);
fs.readdirSync(__dirname + '/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
  });

  require('./config/db')(mongoose);

var app = express();
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));



var todo = require('./routes/todo-crud');
app.use('/', todo);
var todoWithAuth = require('./routes/todo-crud-auth');
app.use('/auth', todoWithAuth);
var register = require('./routes/register');
app.use('/register', register);
var login = require('./routes/login');
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {

  return res.status(err.status || 500).json({success:"false",cause: "not_found", msg: err});
});

var port = process.env.port || 3000;
var server = http.createServer(app);
server.listen(port);
console.log('app listening on port ' + port);
