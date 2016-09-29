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
	User.findById(req.user._id, function(err, user) {
		if(err) {
			res.send(err);
		}

		user.password = "";

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

exports.doLogin = function(req, res) {
	var errors = [];

	if(!req.body.username) errors.push({ message: 'Missing param username' });
	if(!req.body.password) errors.push({ message: 'Missing param password' });

	if(errors.length > 0) {
		res.send({ errors: errors });
	}

	User.findOne({ username: req.body.username }, function(err, user) {
		if(err) res.send(err);

		if(!user) {
			res.json({ message: 'User ' + req.body.username + ' not found' });
		}
		else {
			user.verifyPassword(req.body.password, function(err, isMatch) {
				if(err) res.send(err);

				if(!isMatch) {
					res.json({ message: 'Invalid password' });
				}
				else {
					var token = new Buffer(req.body.username + ":" + req.body.password)
									.toString('base64');
					
					user = user.toObject();
					delete user.password;
					delete user.__v;

					res.json({ token: token, user: user });
				}
			});
		}
	});
};