var mongoose = require('mongoose');

var WorklogSchema = new mongoose.Schema({
	projectId: String,
	date: Date,
	value: String
});

module.exports = mongoose.model('Worklog', WorklogSchema);