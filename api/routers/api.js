var express    = require('express');
var mongoose   = require('mongoose');
var User       = require('../models/user');
var jwt        = require('jsonwebtoken');

var loginRouter = require('./login');

mongoose.connect('mongodb://localhost/angry_tenant')

//create api router
var apiRouter = express.Router();

apiRouter.use('/login', loginRouter);
apiRouter.use(function(req, res, next) {
	//do logging
	console.log('Somebody just came to our app!');

	if (!req.body) console.log('request body is undefined');
	next();
});

//REST API for the app
//for pinging
apiRouter.get('/', function(req, res) {
	res.json({message : 'API is up and running'});
});

apiRouter.route('/users')
	 .post(function(req, res) {
	 	var user = new User();

		user.firstName = req.body.firstName;
		user.lastName  = req.body.lastName;
		user.email     = req.body.email;
		user.phone     = req.body.phone;
		user.password  = req.body.password;

		//save user
		user.save(function(err) {
			if (err) {
			        if (err.code = 11000) return res.status(400).send(err);
				
				else return res.status(400).send(err);
				
			}
			
			 return User.findById(user._id, function(err, user) {
					res.status(201).json(user);
				});
		});
	 })
	 .get(function(req, res) {
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

module.exports = apiRouter;

