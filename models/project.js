var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: String,
	clientId: String,
	dateCreation: Date,
	dateEnd: Date,
	state: String,
	repo: String,
	tags: Array
});

module.exports = mongoose.model('Project', ProjectSchema);