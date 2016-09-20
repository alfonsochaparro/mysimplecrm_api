var Customer = require('../models/customer');

exports.postCustomer = function(req, res) {
	var customer = new Customer();

	customer.name = req.body.name;
	customer.url = req.body.url;
	customer.address = req.body.address;
	customer.city = req.body.city;
	customer.userId = req.user._id;

	customer.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'Customer added successfully!', data: customer});
	});
};

exports.getCustomers = function(req, res) {
	Customer.find({ userId: req.user._id }, function(err, customers) {
		if(err) {
			res.send(err);
		}

		res.json(customers);
	});
};

exports.getCustomer = function(req, res) {
	Customer.find({ userId: req.user._id, _id: req.params.customer_id }, function(err, customer) {
		if(err) {
			res.send(err);
		}

		res.json(customer);
	});
};

exports.putCustomer = function(req, res) {
	Customer.find({ userId: req.user._id, _id: req.params.customer_id }, function(err, customer) {
		if(err) {
			res.send(err);
		}

		if(req.body.name) customer.name = req.body.name;
		if(req.body.url) customer.url = req.body.url;
		if(req.body.address) customer.address = req.body.address;
		if(req.body.city) customer.city = req.body.city;

		customer.save(function(err) {
			if(err) {
				res.send(err);
			}

			res.json(customer);
		});
	});
};

exports.deleteCustomer = function(req, res) {
	Customer.remove({ userId: req.user._id, _id: req.params.customer_id }, function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'Customer removed successfully!' });
	});
};