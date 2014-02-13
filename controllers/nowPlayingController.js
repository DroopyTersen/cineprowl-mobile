var movieService = new(require("../dataaccess/MovieService"))();
var VlcService = require("droopy-vlc");
var currentState = require("../currentstate");
var config = require("../config");
var request = require("request");
var vlcService = new VlcService(config.vlc.url);

module.exports = {
	index: function(req, res) {
		console.log(currentState);
		vlcService.status().then(function(status) {
			if (status) {
				currentState.vlcStatus = status;
			} else {
				currentState.vlcStatus = null;
			}
			res.render("nowplaying/index", currentState);
		}).fail(function() {
			console.log("FAIL");
			currentState.vlcStatus = null;
			res.render("nowplaying/index", currentState);
		});
	},
	status: function(req, res) {
		vlcService.status().then(function(status) {
			currentState.vlcStatus = status;
			res.send(status);
		});
	},
	seek: function(req, res) {
		var seek = req.params.id;
		vlcService.seek(seek).then(function(status) {
			currentState.vlcStatus = status;
			res.send(status);
		});
	},
	volume: function(req, res) {
		var volume = req.params.id;
		vlcService.volume(volume).then(function(status) {
			currentState.vlcStatus = status;
			res.send(status);
		});
	},
	togglepause: function(req, res) {
		vlcService.togglePause().then(function(status) {
			currentState.vlcStatus = status;
			res.send(status);
		});
	},
	stop: function(req, res) {

		request.get(config.vlc.url + "/stop", function(err, resp) {

			if (err) {
				console.log(err)
			} else {
				var movieId = currentstate.nowPlaying.id;
				currentstate.nowPlaying = null;
				currentstate.vlcStatus = null;
				res.redirect("/movies/details/" + movieId);
			}
		});
	}
};