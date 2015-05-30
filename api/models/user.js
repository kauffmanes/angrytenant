var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs')

//User Schema
var UserSchema = new Schema({
	firstName :  {type: String, required: true},
	lastName  :  {type: String, required: true},
	email     :  {type: String, required: true, index: {unique : true}},
	phone     :  String,
	password  :  {type: String, required: true, select: false}
});


UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		user.password = hash;
		next();
	});	
});

UserSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
}

//return the model
module.exports = mongoose.model('User', UserSchema);
