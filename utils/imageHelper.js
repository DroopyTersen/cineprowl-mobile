
var imageHelper = function(argument) {
	var baseUrl = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/";
		// posterSizes = ["w92", "w154", "w185", "w342", "w500", "original"],
		// backdropSizes = ["w300", "w780", "w1280", "original"],
		// profileSizes = ["w45", "w185", "h632", "original"],
		// logoSizes = ["w45", "w92", "w154", "w185", "w300", "w500", "original"];

	var buildLink = function(size, filename) {
		if (filename == null) {
			return "";
		}
		return baseUrl + size + "/" + filename;
	};

	var poster = {
		getThumb: function(filename) {
			return buildLink("w92", filename);
		},
		getMid: function(filename) {
			return buildLink("w185", filename);
		}
	};

	var backdrop = {
		getFull: function(filename) {
			return buildLink("original", filename);
		},
		getMid: function(filename) {
			return buildLink("w780", filename);
		}
	};

	var profile = {
		getThumb: function(filename) {
			return buildLink("w45", filename);
		},
		getMid: function(filename) {
			return buildLink("w185", filename);
		}
	};

	return {
		buildLink: buildLink,
		poster: poster,
		backdrop: backdrop,
		profile: profile
	};
};

module.exports = imageHelper();