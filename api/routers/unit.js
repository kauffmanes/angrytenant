var express    = require('express');
var mongoose   = require('mongoose');
var User       = require('../models/user');
var Unit       = require('../models/unit');
var Ticket     = require('../models/ticket');
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

unitRouter.route('/id/:unit_id/tickets')
          .post(function(req, res) {
            Unit.findById(req.params.unit_id, function(err, unit) {
                if (err) {
                    res.status(500).send(err);
                } else if(!unit) {
                    res.status(400).json({
                        success: false,
                        message: 'Entity Not Found'
                    });
                } else {
                    var submitter = req.login;

                    var ticket = new Ticket();
                    ticket.category = req.body.category;
                    ticket.priority = req.body.priority;
                    ticket.subject  = req.body.subject;
                    ticket.description = req.body.description;
                    ticket.state = 'New';
                    ticket.submittedBy = submitter._id;

                    ticket.save(function(err) {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            unit.tickets.push(ticket._id);
                            unit.save(function(err) {
                                if (err) {
                                    res.status(500).send(err);
                                } else {
                                    Unit.findById(unit._id)
                                        .populate('landlord', 'email')
                                        .populate('address',  'line1 line2 state city zip')
                                        .populate('tenants', 'email')
                                        .populate('tickets', 'category priority subject description state submittedBy')
                                        .exec(function(err, unit) {
                                            if (err) {
                                                res.status(500).send(err);
                                            } else {
                                                res.status(201).json(unit);
                                            }
                                        });
                                }
                            });
                        }
                    });
                }
            });
          });

module.exports = unitRouter;

