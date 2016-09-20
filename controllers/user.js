var User = require('../models/user');

exports.postUser = function(req, res) {
	var user = new User({
		username: req.body.username,
		password: req.body.password
	});

	user.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'User created successfully!' });
	});
};

exports.getUsers = function(req, res) {
	User.find(function(err, users) {
		if(err) {
			res.send(err);
		}

		res.json(users);
	});
};

exports.getUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if(err) {
			res.send(err);
		}

		res.json(user);
	});
};

exports.putUser = function(req, res) {
	User.findById(req.params.user_id, function(err, user) {
		if(err) {
			res.send(err);
		}

		user.password = req.body.password;

		user.save(function(err) {
			if(err) {
				res.send(err);
			}

			res.json(user);
		});
	});
};

exports.deleteUser = function(req, res) {
	User.findByIdAndDelete(req.params.user_id, function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'User removed successfully!' });
	});
};