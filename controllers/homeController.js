"use strict";
var movieService = new(require("../../Services/MovieService"))();
var Q = require("q");
module.exports = {
	index: function(req, res) {
		var recentPromise = movieService.query({}, {addedToDb: -1}, 0, 6);
		var queuePromise = movieService.queue();
		var favoritePromise = movieService.favorites();
		Q.spread([recentPromise, queuePromise, favoritePromise], function(recent, queue, favorites) {
			var viewModel = {
				recent: recent,
				queue: queue,
				favorites: favorites
			};
			res.render("home/index", viewModel);
		});
	}
};