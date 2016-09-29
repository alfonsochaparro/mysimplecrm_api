var mongoose = require('mongoose');

var ContactSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	email: String,
	phone: String,
	customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }
});

module.exports = mongoose.model('Contact', ContactSchema);