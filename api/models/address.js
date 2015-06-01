var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var AddressSchema = new Schema({
	line1: {type: String, required: true},
	line2: {type: String, required: false},
	state: {type: String, required: true},
	city:  {type: String, required: true},
	zip:   {type: String, required: true}
});

module.exports = mongoose.model('Address', AddressSchema);
