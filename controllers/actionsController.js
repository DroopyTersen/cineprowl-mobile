"use strict";
var movieService = require("../movieService");
var imdbService = new(require("droopy-imdb"))();
var currentState = require("../currentstate");
var config = require("../config");
var Http = require("droopy-http");
var vlcService = new(require("droopy-vlc"))(config.vlc.url);

module.exports = {
	play: function(req, res) {
		var id = parseInt(req.params.id, 10);
		var viewModel = {
			id: id,
			playUrl: config.streamer.url + id
		};
		res.render("actions/play", viewModel);
	},
	watch: function(req, res) {
		var id = parseInt(req.params.id, 10);
		var viewModel = {
			id: id,
			playUrl: config.streamer.url + id
		};
		res.render("actions/watch", viewModel);
	},
	updateimdb: function(req, res) {
		var id = parseInt(req.params.id, 10);
		movieService.getById(id)
			.then(function(movie) {
				return imdbService.getRating(movie.imdb_id);
			})
			.then(function(rating) {
				return movieService.update(id, {
					rating: rating
				});
			})
			.then(function() {
				res.redirect("/movies/details/" + id);
			})
			.fail(function() {
				res.send(500, "Failed updating imdb id.");
			});
	},
	togglewatched: function(req, res) {
		var movieId = parseInt(req.params.id, 10);
		var watched = (req.query.watched.toLowerCase() === "true");
		movieService.toggleWatched(movieId, watched)
			.then(function(){
				res.send("success");
			})
			.fail(function() {
				res.send(500, "Failed toggling watched");
			});
	},
	togglefavorite: function(req, res) {
		var movieId = parseInt(req.params.id, 10);
		var value = (req.query.favorite.toLowerCase() === "true") ? new Date() : null;
		movieService.setTag(movieId, "favorited", value)
			.then(function(){
				res.send("success");
			})
			.fail(function() {
				res.send(500, "Failed adding to favorites");
			});
	},
	togglequeue: function(req, res) {
		var movieId = parseInt(req.params.id, 10);
		var value = (req.query.queue.toLowerCase() === "true") ? new Date() : null;
		movieService.setTag(movieId, "queued", value)
			.then(function(){
				res.send("success");
			})
			.fail(function() {
				res.send(500, "Failed on adding to queue");
			});
	},
	remove: function(req, res) {
		var movieId = parseInt(req.params.id, 10);
		movieService.remove(movieId)
			.then(function(){
				res.send("success");
			})
			.fail(function() {
				res.send(500, "Failed on the remove");
			});
	},
};


