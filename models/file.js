var mongoose = require('mongoose');

var FileSchema = new mongoose.Schema({
	path: String,
	mimetype: String,
	size: Number,
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('File', FileSchema);