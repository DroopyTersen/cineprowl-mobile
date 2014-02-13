var currentState = {
	vlcStatus: null,
	nowPlaying:null,
	filter:{},
	page: 1,
	sort:null,
	sortType:"recent"
};

currentState.updateFilter = function (queryString) {
	this.filter = {};
	if (queryString.watched !== undefined) {
		this.filter.watched = queryString.watched === "true" ? true : false;
	}
	if (queryString.genre) {
		this.filter["genres.name"] = queryString.genre;
	}
	if (queryString.mpaa) {
		this.filter.mpaa = queryString.mpaa;
	}
	if (queryString.quality) {
		this.filter["file.quality"] = queryString.quality;
	}
	var releaseRange = {};
	if (queryString.releaseMin) {
		releaseRange["$gte"] = queryString.releaseMin + "-01-01";
	}
	if (queryString.releaseMax) {
		releaseRange["$lte"] = queryString.releaseMax + "-12-31";
	}
	if (Object.keys(releaseRange).length > 0) {
		this.filter.release_date = releaseRange;
	}
};

module.exports = currentState;