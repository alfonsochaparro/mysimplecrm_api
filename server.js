var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var Customer = require('./models/customer');

mongoose.connect('mongodb://localhost:27017/mysimplecrm');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

var port = process.env.PORT || 3000;

var router = express.Router();

router.get('/', function(req, res) {
	res.json({ message: '123456' });
});

var customersRoute = router.route('/customers');

customersRoute.post(function(req, res) {
	var customer = new Customer();

	customer.name = req.body.name;
	customer.url = req.body.url;
	customer.address = req.body.address;
	customer.city = req.body.city;

	customer.save(function(err) {
		if(err) {
			res.send(err);
		}

		res.json({ message: 'Customer added successfully!', data: customer});
	});

});

customersRoute.get(function(req, res) {
	Customer.find(function(err, customers) {
		if(err) {
			res.send(err);
		}

		res.json(customers);
	});
});

app.use('/api', router);

app.listen(port);
console.log('mysimplecrm api running on ' + port);