var Flight = require('../models/flight');
var Ticket = require('../models/ticket');

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

function show(req, res) {
    Flight.findById(req.params.id, function(err, flight,) {
        Ticket.find({flight: flight._id}, function(err, tickets) {
            res.render('flights/show', { 
                title: 'Flight Details', 
                flight, 
                tickets
            });
        });  
    });
};

function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function(err) {
      if (err) return res.redirect('/flights/new');
      res.redirect('/flights');
    });
};

function newFlight(req, res) {
    res.render('flights/new', { title: 'Add A Flight' });
};

function index(req, res) {
    Flight.find({}, function(err, flights) {
        res.render('flights/index', { title: 'All Flights', flights}); 
    });
};