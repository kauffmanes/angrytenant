var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var UserSchema = require('./user').schema;

//Unit Schema
var UnitSchema = new Schema({
	address: {type: String, required: true},
	landord: {type: Schema.Types.ObjectId, ref: 'User'},
        tenants: [UserSchema]
});

UnitSchema.methods.setLandlord = function(user) {
	var unit = this;
	unit.lanlord = user;
	return unit;
};

UnitSchema.methods.addTenant = function(user) {
	var unit = this;
	unit.tenants.push(user);
	return unit;
};

module.exports = mongoose.model('Unit', UnitSchema);
