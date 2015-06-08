var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

//Unit Schema
var UnitSchema = new Schema({
	address: {type: Schema.Types.ObjectId, ref: 'Address'},
	landlord: {type: Schema.Types.ObjectId, ref: 'User'},
    tenants: [{type:Schema.Types.ObjectId, ref: 'User'}],
    tickets: [{type:Schema.Types.ObjectId, ref: 'Ticket'}]
});

module.exports = mongoose.model('Unit', UnitSchema);
