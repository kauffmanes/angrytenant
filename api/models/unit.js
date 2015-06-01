var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Unit Schema
var UnitSchema = new Schema({
	address: {type: Schema.Types.ObjectId, ref: 'Address'},
	landlord: {type: Schema.Types.ObjectId, ref: 'User'},
        tenants: [{type:Schema.Types.ObjectId, ref: 'User'}]
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
