var movieService = new(require("../services/MovieService"))();
var config = require('../config');
var movieDbService = new(require("droopy-moviedb"))(config.movieDb.key);
var Person = require("../models/Person");
var q = require("q");

module.exports = {
	index: function (req, res) {
		res.send("BLAH");
	},
	details: function (req, res) {
		var id = parseInt(req.params.id, 10);

		q.spread([movieDbService.getPerson(id), movieService.filmography(id)], function(personRes, owned){
			var person = new Person(personRes, owned);
			res.render("people/details", person);
		});
	}
};