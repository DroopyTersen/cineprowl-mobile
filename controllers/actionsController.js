var movieService = new(require("../../Services/MovieService"))();
var currentState = require("../currentstate");
var config = require("../config");
var VlcService = new(require("droopy-vlc"))(config.vlc.url);

module.exports = {
	play: function(req, res) {
		var id = parseInt(req.params.id, 10);
		movieService.getById(id).then(function(movie) {
			currentState.nowPlaying = movie;
			vlcService.play(movie.file.filepath);
			res.send("Success: Playing " + movie.Title);
		});
	}
};

