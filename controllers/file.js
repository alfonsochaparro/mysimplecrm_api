var File = require('../models/file');

exports.getFiles = function(req, res) {
	File.find({ user: req.user._id}, function(err, files) {
		if(err) {
			res.send(err);
		}

		res.json(files);
	});
};

exports.postFile = function(req, res) {
	if(!req.file) {
		res.json({ message: 'Error uploading file' });
	}

	var file = new File();

	file.path = '/public/files/' + req.file.filename;
	file.mimetype = req.file.mimetype;
	file.size = req.file.size;
	file.user = req.user._id;

	file.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'File uploaded successfully', data: file });
	});
};