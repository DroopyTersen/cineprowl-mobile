var movieService = new(require("cineprowl-services")).MovieService();
var config = require('../config');
var movieDbService = new(require("droopy-moviedb"))(config.movieDb.key);

var Person = require("cineprowl-models").Person;
var imageHelper = require("cineprowl-models").imageHelper;
var q = require("q");

module.exports = {
	index: function (req, res) {

		movieService.actors(50).then(function(actors){
			var evens = [];
			var odds = [];
			for (var i = 0; i < actors.length; i++) {
				actors[i].name = actors[i]._id.name;
				actors[i].id = actors[i]._id.id;
				actors[i].profileImage = imageHelper.profile.getMid(actors[i]._id.profile_path);
				if(i % 2 === 0) {
					evens.push(actors[i]);
				} else {
					odds.push(actors[i]);
				}
			}
			res.render("people/index", {evens: evens, odds:odds});
		});
	}, 
	details: function (req, res) {
		var id = parseInt(req.params.id, 10);

		q.spread([movieDbService.getPerson(id), movieService.filmography(id)], function(personRes, owned){
			var person = new Person(personRes, owned);
			res.render("people/details", person);
		}); 
	}
};

