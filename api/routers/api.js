var express    = require('express');
var mongoose   = require('mongoose');
var User       = require('../models/user');
var UnitRouter = require('./unit');
var Address    = require('../models/address');
var Ticket     = require('../models/ticket');
var jwt        = require('jsonwebtoken');
var Token      = require('../util/token');

var loginRouter = require('./login');

mongoose.connect('mongodb://localhost/angry_tenant')

//create api router
var apiRouter = express.Router();

apiRouter.use('/login', loginRouter);

//Registering new account doesn't require authentication
apiRouter.post('/users', function(req, res) {
	var user = new User();
	user.firstName = req.body.firstName;
	user.lastName  = req.body.lastName;
	user.email     = req.body.email;
	user.phone     = req.body.phone;
	user.password  = req.body.password;

	//save user
	user.save(function(err) {
		if (err) return res.status(400).send(err);
		return User.findById(user._id, 
				    function(err, user) {
					res.status(201).json(user);
				});
	});
});

//make sure users are authenticated before they can make any call
//to the rest of the api
apiRouter.use(function(req, res, next) {
	//do logging
	console.log('Somebody just came to our app!');
	
	var token = req.headers['x-access-token'];
	
	//decode token
	//TODO: move this code into a util library
	if (token) {
		var decoded = Token.verify(token);
		if (!decoded) {
			return res.status(403).json({
				success: false,
				message: 'Failed to authenticate token'
			});
		}

		User.findById(decoded._id, function(err, user){
					req.login = user;
					next();
				});
	} else {
		return res.status(403).json({
			success: false,
			message: 'No token provided'
		});
	}

});

//REST API for the app
//for pinging
apiRouter.get('/', function(req, res) {
	res.json({message : 'API is up and running'});
});

apiRouter.get('/me', function(req, res) {
	var login = req.login;
	res.status(200).send(req.login);
});

//users REST API
apiRouter.get('/users',function(req, res) {
	 	User.find(function(err, users) {
			if (err) return res.status(500).send(err);
			return res.status(200).json(users);
		});
	 });

apiRouter.route('/users/id/:user_id')
         .get(function(req, res) {
	 	User.findById(req.params.user_id, function(err, user) {
			if (err) return res.status(500).send(err);
			return res.status(200).json(user);
		});
	 });

//add unit api 
apiRouter.use('/units', UnitRouter);

module.exports = apiRouter;

