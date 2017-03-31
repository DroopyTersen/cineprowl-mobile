var movieService = new(require("cineprowl-services")).MovieService();
var imageHelper = require("cineprowl-models").imageHelper;

module.exports = {
	index: function (req, res) {
		res.redirect("/");
	},
	query: function(req, res) {
		var search = req.params.id;
		movieService.search(search).then(function(results) {
			results.people.forEach(function(actor){
				actor.name = actor._id.name;
				actor.id = actor._id.id;
				actor.profileImage = imageHelper.profile.getThumb(actor._id.profile_path);
			});
			console.log(results);

			res.render("partials/searchResults", {
				movies: results.movies,
				people: results.people,
				layout: false
			});
		});
	}
};
