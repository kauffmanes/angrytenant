var express = require('express');
var Ticket = require('../models/ticket');

var ticketRouter = express.Router();

ticketRouter.route('/id/:ticket_id')
            .get(function(req, res) {
                Ticket.findById(req.params.ticket_id, function(err, ticket) {
                    if (err) {
                        res.status(500).send(err);
                    } else if (!ticket) {
                        res.status(400).json({
                            success: false,
                            message: 'Entity Not Found'
                        });
                    } else {
                        res.status(200).json(ticket);
                    }
                });
            })
            .put(function(req, res) {
                Ticket.findById(req.params.ticket_id, function(err, ticket) {
                    if (err) {
                        res.status(500).send(err);
                    } else if (!ticket) {
                        res.status(400).json({
                            success: false,
                            message: 'Entity Not Found'
                        });
                    } else {
                        console.log('Start saving ticket');
                        if (req.body.category) ticket.category = req.body.category;
                        if (req.body.priority) ticket.priority = req.body.priority;
                        if (req.body.subject)  ticket.subject  = req.body.subject;
                        if (req.body.description) ticket.description = req.body.description;
                        if (req.body.state) ticket.state = req.body.state;

                        ticket.save(function(err) {
                            if (err) return res.status(500).send(err);

                            res.status(201).json(ticket);
                        });
                    }
                });
            });

module.exports = ticketRouter;
