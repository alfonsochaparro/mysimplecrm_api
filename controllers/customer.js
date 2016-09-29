var Customer = require('../models/customer');

exports.postCustomer = function(req, res) {
	var customer = new Customer();

	customer.name = req.body.name;
	customer.url = req.body.url;
	customer.address = req.body.address;
	customer.city = req.body.city;
	customer.userId = req.user._id;

	if(req.projects) {
		customer.projects = req.projects;
	}

	if(req.picture) {
		customer.picture = req.picture;
	}

	customer.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'Customer added successfully!', data: customer});
	});
};

exports.getCustomers = function(req, res) {
	Customer.find({ userId: req.user._id })
		.select("-__v")
		.populate("picture", "-_id path mimetype")
		.exec(function(err, customers) {
			if(err) {
				res.send(err);
			}

			res.json(customers);
		});
};

exports.getCustomer = function(req, res) {
	Customer.findOne({ userId: req.user._id, _id: req.params.customer_id })
		.select("-__v")
		.populate("projects")
		.populate("picture", "-_id path mimetype")
		.exec(function(err, customer) {
		if(err) {
			res.send(err);
		}

		if(customer) {
			res.json(customer);
		}
		else {
			res.json({ message: 'Not found' });
		}
	});
};

exports.putCustomer = function(req, res) {
	Customer.findOne({ userId: req.user._id, _id: req.params.customer_id }, function(err, customer) {
		if(err) {
			res.send(err);
		}

		if(!customer) {
			res.json({ message: 'Not found' });
			return;
		}
		console.log(req.body.picture);

		if(req.body.name) customer.name = req.body.name;
		if(req.body.url) customer.url = req.body.url;
		if(req.body.address) customer.address = req.body.address;
		if(req.body.city) customer.city = req.body.city;
		if(req.body.projects) customer.projects = req.body.projects;		
		if(req.body.picture) customer.picture = req.body.picture;

		customer.save(function(err) {
			if(err) {
				res.send(err);
			}

			res.json(customer);
		});
	});
};

exports.deleteCustomer = function(req, res) {
	Customer.findOne({ userId: req.user._id, _id: req.params.customer_id }, function(err, customer) {
		if(err) {
			res.send(err);
		}

		if(!customer) {
			res.json({ message: 'Not found' });
		}
		else {
			customer.remove(function(err) {
				if(err) {
					res.send(err);
				}

				res.json({ message: 'Customer removed successfully!' });
			});
		}
	});
};