var express    = require('express');
var app        = express();
var bodyParser = require('body-parser')
var morgan     = require('morgan')
var mongoose   = require('mongoose')
var port       = process.env.PORT || 8080
var User       = require('./api/models/user')
var jwt        = require('jsonwebtoken');

var superSecret = 'ThisIsAVerySecretiveSecret';

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

//handle application/json content type
app.use(bodyParser.json());


//basic route for the home page
app.use(express.static(__dirname + '/public/src'))

//create api router
var apiRouter = express.Router();

apiRouter.route('/login')
         .post(function(req, res) {
		User.findOne({email : req.body.email})
		    .select("email password")
		    .exec(function(err, user){
		
		    	if (err) res.status(500).send(err);
			
		        if (!user) {
				res.status(400).json({
					success: false,
					message: "Wrong email!"
				});
			} else if (user) {
				
				var validPassword = user.comparePassword(req.body.password);
				
				if (!validPassword) {
					res.status(400).json({
						success: false,
						message: "Wrong password"
					});	
				} else {
					
					var token = jwt.sign({
						email: user.email,
					}, superSecret, {
						expiresInMinutes: 1440		
					});
					
					res.json({
						success: true,
						message: 'Enjoy your token',
						token: token
					});
					console.log("Success fully logged in");
				}
			}
		    });
	 });

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


app.use('/api', apiRouter);

app.listen(port);
console.log('Starting server at port ' + port);
