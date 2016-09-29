var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');

var passport = require('passport');
var authController = require('./controllers/auth');

var customerController = require('./controllers/customer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var dashboardController = require('./controllers/dashboard');
var projectController = require('./controllers/project');
var fileController = require('./controllers/file');


mongoose.connect('mongodb://localhost:27017/mysimplecrm');

var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-type,Content-Length,Content-MD5,Authorization,Accept,Accept-Version,Accept-Encoding,Accept-Language');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use('/public', express.static(__dirname + '/public'));

var storage = multer.diskStorage({
	destination: function(request, file, callback) {
		callback(null, './public/files/');
	},
	filename: function(request, file, callback) {
		callback(null, Date.now() + '-' + file.originalname)
	}
});

var upload = multer({ storage: storage });

var router = express.Router();

router.route('/users')
	.post(userController.postUser);

router.route('/login')
	.post(userController.doLogin);

router.route('/users/:user_id')
	.put(authController.isAuthenticated, userController.putUser)
	.delete(authController.isAuthenticated, userController.deleteUser);



router.route('/dashboard')
	.get(authController.isAuthenticated, dashboardController.getDashboard);



router.route('/customers')
	.get(authController.isAuthenticated, customerController.getCustomers)
	.post(authController.isAuthenticated, customerController.postCustomer);

router.route('/customers/:customer_id')
	.get(authController.isAuthenticated, customerController.getCustomer)
	.put(authController.isAuthenticated, customerController.putCustomer)
	.delete(authController.isAuthenticated, customerController.deleteCustomer);

router.route('/customers/:customer_id/projects')
	.get(authController.isAuthenticated, projectController.getProjects)
	.post(authController.isAuthenticated, projectController.postProject);

router.route('/projects')
	.get(authController.isAuthenticated, projectController.getProjects)
	.post(authController.isAuthenticated, projectController.postProject);

router.route('/projects/:project_id')
	.get(authController.isAuthenticated, projectController.getProject)
	.delete(authController.isAuthenticated, projectController.deleteProject);

router.route('/files')
	.get(authController.isAuthenticated, fileController.getFiles)
	.post(authController.isAuthenticated, upload.single('file'), fileController.postFile);

app.use('/api', router);

app.listen(3000);
console.log('mysimplecrm api running on 3000');