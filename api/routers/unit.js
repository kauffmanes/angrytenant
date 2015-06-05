var express    = require('express');
var mongoose   = require('mongoose');
var User       = require('../models/user');
var Unit       = require('../models/unit');
var Address    = require('../models/address');

//create unit router
var unitRouter = express.Router();

//units REST API
unitRouter.route('/')
	 .post(function(req, res) {
		var landlord = req.login;
		
		var address = new Address();
		address.line1 = req.body.address.line1;
		address.line2 = req.body.address.line2;
		address.state = req.body.address.state;
		address.city  = req.body.address.city;
		address.zip   = req.body.address.zip;

		address.save(function(err) {
			if (err) {
				res.status(400).send(err);
			} else { 
			
				var unit = new Unit();
				unit.address = address._id;
				unit.landlord = landlord._id;
				
				unit.save(function(err) {
					if (err) return res.status(400).send(err);
					
					return Unit.findById(unit._id)
						   .populate('landlord', 'email')
						   .populate('address', 'line1 line2 state city zip')
						   .exec(function(err, unit) {
							if (err) {
								res.status(500).send(err);
							} else {
								res.status(201).json(unit);
							}
						   });
				});
			}
		});
	 })
	.get(function(req, res) {
		var landlordEmail = req.query.landlord;
		if (landlordEmail) {
			Unit.find()
			     .where('landlord')
			     .equals(landlordEmail)
			     .populate('address', 'line1 line2 state city zip')
			     .populate('landlord', 'email')
                             .exec(function(err, units) {
				if(err) {
				  res.status(500).send(err);
				} else {
				  res.status(200).json(units);
				}
			     });		
		} else {
			Unit.find()
			     .populate('address', 'line1 line2 state city zip')
			     .populate('landlord', 'email')
   			     .exec(function(err, units){
				if (err) {
				   res.status(500).send(err);
				} else {
				   res.status(200).json(units);
				}
			     });
		}	

	});

	unitRouter.route('/id/:unit_id/tenants')
		 .post(function(req, res) {
			Unit.findById(req.params.unit_id, function(err, unit) {
				if (err) {
				  res.status(400).send(err);
				} else {
				  unit.tenants.push(req.body._id);
				  unit.save(function(err) {
					if (err) return res.status(500).send(err);
					Unit.findById(unit._id)
					    .populate('landlord', 'email')
					    .populate('address', 'line1 line2 state city zip')
					    .populate('tenants', 'email')
					    .exec(function(err, unit) {
						if (err) {
						  res.status(500).send(err);
						} else {
						  res.status(201).json(unit);
						}
					    });
				  });
				}
			});
		  });

module.exports = unitRouter;

