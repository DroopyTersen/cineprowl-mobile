"use strict";
var movieService = new(require("cineprowl-services")).MovieService();
var imageHelper = require("cineprowl-models").imageHelper;
var Q = require("q");

module.exports = {
	index: function(req, res) {
		var recentPromise = movieService.query({}, {addedToDb: -1}, 0, 6);
		var queuePromise = movieService.queue();
		var actorsPromise = movieService.actors(16);
		Q.spread([recentPromise, queuePromise, actorsPromise], function(recent, queue, actors) {
			actors.forEach(function(actor){
				actor.name = actor._id.name;
				actor.id = actor._id.id;
				actor.profileImage = imageHelper.profile.getMid(actor._id.profile_path);
			});
			var viewModel = {
				recent: recent,
				queue: queue,
				actors: actors
			};
			res.render("home/index", viewModel);
		});
	}
};