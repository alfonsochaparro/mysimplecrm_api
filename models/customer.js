var mongoose = require('mongoose');

var CustomerSchema = new mongoose.Schema({
	name: String,
	url: String,
	address: String,
	city: String,
	userId: String,
	projects: [{
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'Project'
	}],
	picture: { type: mongoose.Schema.Types.ObjectId, ref: 'File' }
});

module.exports = mongoose.model('Customer', CustomerSchema);