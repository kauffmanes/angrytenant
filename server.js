var express    = require('express');
var app        = express();
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var port       = process.env.PORT || 8080
var User       = require('./api/models/user')

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
	next();
});

mongoose.connect('mongodb://localhost/angry_tenant')

//Log all request to console
app.use(morgan('dev'));
app.use(bodyParser.json());


//basic route for the home page
app.get('/', function(req, res) {
	res.send('Welcome to the home page');
});

//create api router
var apiRouter = express.Router();

apiRouter.use(function(req, res, next) {
	//do logging
	console.log('Somebody just came to our app!');

	if (!req.body) console.log('request body is undefined');
	next();
});

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
				if (err.code = 11000) return res.status(400).json({success: false, message: 'A user With That emmail already exists. '});
				else return res.status(400).send(err);
			}
			
			User.findById(user._id, function(err, user) {
				res.status(201).json(user);
			});
		});
	 });

app.use('/api', apiRouter);

app.listen(port);
console.log('Starting server at port ' + port);
