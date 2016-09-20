var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var customerController = require('./controllers/customer');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

mongoose.connect('mongodb://localhost:27017/mysimplecrm');

var app = express();

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(passport.initialize());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var router = express.Router();

router.route('/customers')
	.get(authController.isAuthenticated, customerController.getCustomers)
	.post(authController.isAuthenticated, customerController.postCustomer);

router.route('/customers/:customer_id')
	.get(authController.isAuthenticated, customerController.getCustomer)
	.put(authController.isAuthenticated, customerController.putCustomer)
	.delete(authController.isAuthenticated, customerController.deleteCustomer);

router.route('/users')
	.post(userController.postUser);

router.route('/login')
	.post(authController.isAuthenticated, userController.getUser);

router.route('/users/:user_id')
	.put(authController.isAuthenticated, userController.putUser)
	.delete(authController.isAuthenticated, userController.deleteUser);

app.use('/api', router);

app.listen(3000);
console.log('mysimplecrm api running on 3000');