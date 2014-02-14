"use strict";
var movieService = new(require("../../Services/MovieService"))();
var currentState = require("../currentstate");
var config = require("../config");
var Http = require("droopy-http");
var vlcService = new(require("droopy-vlc"))(config.vlc.url);

module.exports = {
	play: function(req, res) {
		var id = parseInt(req.params.id, 10);
		movieService.getById(id).then(function(movie) {
			currentState.nowPlaying = movie;
			var url = config.vlc.url + "/play?filepath=" + movie.file.filepath;
			Http.prototype.get(url);
			res.send("Success: Playing " + movie.Title);
		});
	}
};

