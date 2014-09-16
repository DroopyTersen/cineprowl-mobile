var movieService = new(require("CineProwl-Services")).MovieService();
var currentState = require("../currentstate");

var listView = function(res) {
	movieService.query(currentState.filter, currentState.sort).then(function(movies) {
		currentState.displayed = movies.length;
		var viewModel = {
			pageTitle: "CineProwl",
			movies: movies,
			currentState: currentState
		};

		res.render("movies/listview", viewModel);
	});
};

module.exports = {
	index: function(req, res) {
		currentState.filter = {};
		res.redirect("/movies/recent");
	},

	recent: function(req, res) {
		currentState.sort = {
			addedToDb: -1
		};
		currentState.sortType = "recent";
		listView(res);
	},

	toprated: function(req, res) {
		currentState.sort = {
			rating: -1
		};
		currentState.sortType = "rating";
		listView(res);
	},
	byname: function(req, res) {
		currentState.sort = {
			title: 1
		};
		currentState.sortType = "name";
		listView(res);
	},
	unwatched: function(req, res) {
		currentState.filter.watched = false;
		listView(res);
	},
	queue: function(req, res) {
		movieService.queue().then(function(movies){
			console.log(movies);
			var viewModel = {
				pageTitle: "Queue",
				movies: movies,
				currentState: currentState
			};

			res.render("movies/collection", viewModel);
		});
	},
	favorites: function(req, res) {
		movieService.favorites().then(function(movies){
			var viewModel = {
				pageTitle: "Favorites",
				movies: movies,
				currentState: currentState
			};

			res.render("movies/collection", viewModel);
		});
	},
	genres: function(req, res) {
		if (req.params.id) {
			var genre = req.params.id;
			currentState.filter["genres.name"] = genre;
			listView(res);
		} else {
			movieService.genres().then(function(genres) {
				var viewModel = {
					genres: genres,
					pageTitle: "Genres - CineProwl",
					route: "/Movies/Genres"
				};
				res.render("movies/genres", viewModel);
			});
		}
	},
	more: function(req, res) {
		movieService.query(currentState.filter, currentState.sort, currentState.displayed, 10)
			.then(function(movies) {
				if (movies.length > 0) {
					currentState.displayed += movies.length;
					var viewModel = {
						layout: false,
						movies: movies
					};
					res.render("partials/movielist", viewModel);
				} else {
					res.send("");
				}
			});
	},
	details: function(req, res) {
		var id = parseInt(req.params.id, 10);
		movieService.getById(id).then(function(movie) {
			res.render("movies/details", movie);
		});
	},
	filter: function(req, res) {
		currentState.updateFilter(req.query);
		console.log(currentState.filter);
		movieService.query(currentState.filter, currentState.sort).then(function(movies){
			if (movies.length) {
				currentState.displayed = movies.length;
				var viewModel = {
					layout: false,
					movies: movies
				};
				res.render("partials/movielist", viewModel);
			} else {
				res.send("<li>No Results</li>");
			}
		}).fail(function(error){
			res.send(error);
		});
	}
};
