var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
	name: String,
	customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
	dateCreation: { type: Date, default: Date.now },
	dateEnd: Date,
	state: String,
	repo: String,
	tags: Array
});

module.exports = mongoose.model('Project', ProjectSchema);