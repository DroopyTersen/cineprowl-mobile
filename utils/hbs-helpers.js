var currentState = require("../currentState");

var isSelected = function (filterType, value) {
	return currentState.filter[filterType] == value ? "selected" : "";
};

var isChecked = function(filterType, value) {
	return currentState.filter[filterType] == value ? "checked" : "";
};

var filterValue = function(filterType) {
	var specialFields = {
		releaseMin: function() {
			if (currentState.filter.release_date && currentState.filter.release_date.$gte) {
				return currentState.filter.release_date.$gte.split("-")[0];
			}
			return "1920";
		},
		releaseMax: function () {
			if (currentState.filter.release_date && currentState.filter.release_date.$lte) {
				return currentState.filter.release_date.$lte.split("-")[0];
			}
			return "2016";
		}
	};
	if (specialFields[filterType]) {
		return specialFields[filterType]();
	}
	return currentState.filter[filterType];
};

var tagHelper = function(tagName, tags) {
	var tagNames = {
		favorites: "favorited",
		queue: "queued"
	}
	if (tags && tagNames[tagName] && tags[tagNames[tagName]]) {
		return "Remove from " + tagName;
	}
	return "Add to " + tagName;
};

module.exports = {
	isSelected: isSelected,
	isChecked: isChecked,
	filterValue: filterValue,
	tagHelper: tagHelper
};