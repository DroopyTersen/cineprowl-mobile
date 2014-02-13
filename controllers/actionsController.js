var movieService = new(require("../dataaccess/MovieService"))();
var currentState = require("../currentstate");
var config = require("../config");
var request = require("request");

module.exports = {
	play: function(req, res) {
		var id = parseInt(req.params.id, 10);
		movieService.getById(id).then(function(movie) {
			currentState.nowPlaying = movie;
			var url = config.vlc.url + "/play?filepath=" + movie.file.filepath;
			console.log(url);
			request.get(url, function(err, resp){
				if (err) console.log(err);

			});
			currentState.nowPlaying = movie;
			res.send("Success: Playing " + movie.Title);
		});
	}
};

