var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TicketSchema = new Schema({
    category     : {type: String, enum: ['Flooring', 'Plumbing', 'Heating', 'Kitchen'], required: true},
    priority     : {type: String, enum: ['High', 'Normal', 'Low'], required: true},
    subject      : {type: String, required: true},
    description  : {type: String, required: true},
    state        : {type: String, enum: ['New', 'Assigned', 'Closed'], required: true},
    submittedBy  : {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Ticket', TicketSchema);

