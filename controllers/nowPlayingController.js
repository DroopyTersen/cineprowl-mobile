"use strict";

var movieService = new(require("../services/MovieService"))();
var VlcService = require("droopy-vlc");
var movieService = new(require("../services/MovieService"))();
var currentState = require("../currentState");
var config = require("../config");
var Http = require("droopy-http");
var vlcService = new VlcService(config.vlc.url);

var escapeRegEx = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

var vlcRequest = function(res, method, value) {
	var vlcStatus = null;
	vlcService[method](value)
		.then(function(status){
			vlcStatus = status;
			var queryObject = {
				"file.filename": {
					"$regex": escapeRegEx(status.filename),
					"$options": "i"
				}
			};
			return movieService.findOne(queryObject);
		})
		.then(function(movie){
			res.send({ 
				vlcStatus: vlcStatus,
				movie: movie 
			});
		})
		.fail(function() {
			console.log("ERROR IN FROM VLC SERVICE");
			console.log(arguments);
			res.send(500, "Unable to get VLC status");
		});
};
var playMovie = function(res, id) {
	movieService.getById(id)
	.then(function(movie) {
		var url = config.vlc.url + "/play?filepath=" + movie.file.filepath;
		return Http.prototype.get(url, null, true);
	})
	.then(function() {
		res.redirect("/NowPlaying");
	})
	.fail(function(){
		res.send(JSON.stringify(arguments));
	});
};
module.exports = {
	index: function(req, res) {
		res.render("nowplaying/index");
	},	
	play: function(req, res) {
		var id = parseInt(req.params.id, 10);
		//first check if something is already playing
		vlcService.status()
			//something is playing already so kill it
			.then(function() {
				Http.prototype.get(config.vlc.url + "/stop", null, true)
					.then(function() {
						res.redirect(req.url);
					});
			//Vlc status failed so nothing is playing
			}, function() {
				return playMovie(res, id);
			});
	},
	vlc: function(req, res) {
		var method = req.params.id;
		vlcRequest(res, method, req.query.value);
	},
	stop: function(req, res) {
		var redirectUrl = "/";
		if (req.params.id) {
			redirectUrl = "movies/details/" + parseInt(req.params.id, 10);
		}
		Http.prototype.get(config.vlc.url + "/stop", null, true).then(function() {
			res.redirect(redirectUrl);
		}).fail(function() {
			console.log(arguments);
			res.redirect("/");
		});
	}
};