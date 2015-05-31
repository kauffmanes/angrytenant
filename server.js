var express    = require('express');
var app        = express();
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var port       = process.env.PORT || 8080
var User       = require('./api/models/user')
var jwt        = require('jsonwebtoken');
var apiRouter  = require('./api/routers/api')
var superSecret = 'ThisIsAVerySecretiveSecret';

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

//mongoose.connect('mongodb://localhost/angry_tenant')

//Log all request to console
app.use(morgan('dev'));

//handle application/json content type
app.use(bodyParser.json());


//basic route for the home page
app.use(express.static(__dirname + '/public/target'))

app.listen(port);
console.log('Starting server at port ' + port);
