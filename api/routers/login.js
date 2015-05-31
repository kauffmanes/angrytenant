var express = require('express');
var User    = require('../models/user');
var jwt     = require('jsonwebtoken');

var superSecret = 'ThisIsAVerySerectiveSecret';

var loginRouter = express.Router();

loginRouter.post('/', function(req, res) {
	User.findOne({
		email : req.body.email
	})
	.select('_id email password')
	.exec(function(err, user){
		if (err) {
			console.log('Error retrieving login info for ' + req.body.email);
			console.log(err);
			res.status(500).json({success : false, message: 'Unexpected Error dected on server'});
			return;
		}
		
		if (!user) {
			res.status(400).json({success: false, message: 'Incorrect combination of email/password'});
			return;
		}
		
		var isValidPassword = user.comparePassword(req.body.password);
		
		if (!isValidPassword) {
			res.status(400).json({success: false, message: 'Incorrect combination of email/password'});
			return;
		}
		
		//user successfully logged in. Creating a token for them....
		var token = jwt.sign({
			_id: user._id,
			email: user.email
		}, superSecret, {
			expiresInMinutes: 1440 //expire in 24 hours
		});
		
		res.status(200).json({
			success: true,
			message: 'Enjoy your token',
			token: token	
		});
	});
});

module.exports = loginRouter;

