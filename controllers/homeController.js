var movieService = new(require("../../Services/MovieService"))();

module.exports = {
	index: function(req, res) {
		movieService.queue().then(function(movies){
			var viewModel = {
				movies: movies,
			};
			res.render("home/index", viewModel);
		});
	}
};