var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: String,
	url: String,
	address: String,
	city: String
});

module.exports = mongoose.model('Customer', CustomerSchema);