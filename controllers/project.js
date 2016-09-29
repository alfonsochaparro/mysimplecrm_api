var Project = require('../models/project');
var Customer = require('../models/customer');

exports.getProjects = function(req, res) {
	if(req.params.customer_id) {
		Project.find({ customerId: req.params.customer_id}, function(err, projects) {
			if(err) {
				res.send(err);
			}

			res.json(projects);
		});
	}
	else {
		
		Customer.find({ userId: req.user._id})
			.populate("projects")
			.exec(function(err, customers) {
				if(err) {
					res.send(err);
				}
				var projects = [];
				customers.forEach(function(customer) {
					if(customer.projects && customer.projects.length > 0) {
						projects = projects.concat(customer.projects);
					}
				});		

				res.json(projects);	
			});
	}
};

exports.getProject = function(req, res) {	
	Project.findOne({ _id: req.params.project_id})
		.populate("customer", "_id name url")
		.exec(function(err, project) {
			if(err) {
				res.send(err);
			}

			if(!project) {
				res.json({ message: "Not found" });
			}
			else {
				res.json(project);
			}
		});
};

exports.postProject = function(req, res) {
	var customerId = req.params.customer_id ? req.params.customer_id : req.body.customer;

	if(!customerId) {
		res.json({ errors: [ { message: "Missing param customer" } ] } );
		return;
	}

	Customer.findOne({ userId: req.user._id, _id: customerId}, function(err, customer) {
		if(err) {
			res.send(err);
		}

		var project = new Project();
		project.name = req.body.name;
		project.customer = customerId;
		project.state = req.body.state;
		project.repo = req.body.repo;
		project.tags = req.body.tags;

		if(!customer.projects) {
			customer.projects = [];
		}

		customer.projects.push(project);

		customer.save(function(err) {
			if(err) {
				res.send(err);
			}

			project.save(function(err) {
				if(err) {
					res.send(err);
				}

				res.json({ message: 'Project added successfully!', data: project});
			});
		});
	});	
};

exports.deleteProject = function(req, res) {
	Project.findOne({ _id: req.params.project_id}, function(err, project) {
		if(err) {
			res.send(err);
		}

		if(!project) {
			res.json({ message: 'Not found' });
		}
		else {
			project.remove(function(err) {
				if(err) {
					res.send(err);
				}

				res.json({ message: 'Project removed successfully!' });
			});
		}
	});
};