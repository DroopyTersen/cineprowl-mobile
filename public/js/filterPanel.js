var filterPanel = (function() {

	var fields = {
		watched: {
			getValue: function() {
				var watchedYes = $("#watched-yes").closest(".ui-checkbox").find(".ui-btn-active").length;
				var watchedNo = $("#watched-no").closest(".ui-checkbox").find(".ui-btn-active").length;
				if (watchedYes && !watchedNo) {
					return true;
				} else if (watchedNo && !watchedYes) {
					return false;
				}
				return null;
			}
		}
	};
	// 	eventHandlers.filter = {
	// 	setActive: function() {
	// 		var isFiltered = false;
	// 		var $filterForm = $("#filterForm");

	// 		var $genre = filterForm.find
	// 	},
	// 	getValues: function() {
	// 		var filter = {};
	// 		var $filterForm = $("#filterForm");
	// 		//Do not filter if neither or both are checked
	// 		var watchedYes = $("#watched-yes").closest(".ui-checkbox").find(".ui-btn-active").length;
	// 		var watchedNo = $("#watched-no").closest(".ui-checkbox").find(".ui-btn-active").length;
	// 		if (watchedYes && !watchedNo) {
	// 			filter.watched = true;
	// 		} else if (watchedNo && !watchedYes) {
	// 			filter.watched = false;
	// 		}
	// 		//pass null if it is the default value
	// 		var genre = $filterForm.find(".ui-btn-text .filter.genre").text();
	// 		if (genre !== "Genre") filter.genre = genre;

	// 		var mpaa = $filterForm.find(".ui-btn-text .filter.mpaa").text();
	// 		if (mpaa !== "MPAA") filter.mpaa = mpaa;

	// 		var quality = $filterForm.find(".ui-btn-text .filter.quality").text();
	// 		if (quality !== "Quality") filter.quality = quality;

	// 		var releaseMin = $filterForm.find("#releaseMin").val();
	// 		if (releaseMin !== "1920") filter.releaseMin = releaseMin;

	// 		var releaseMax = $filterForm.find("#releaseMax").val();
	// 		if (releaseMax !== "2015") filter.releaseMax = releaseMax;

	// 		return filter;
	// 	},

	// 	change: function(e) {
	// 		if (!eventHandlers.filter.isBusy) {
	// 			eventHandlers.filter.isBusy = true;
	// 			eventHandlers.submit
	// 			setTimeout(function() {
	// 				var values = eventHandlers.filter.getValues();
	// 				eventHandlers.filter.isBusy = false;
	// 			}, 100);
	// 		}
	// 	},
	// 	submit: function(e) {
	// 		e.preventDefault();
	// 		$movieList = $("#movieList");
	// 		$movieList.hide();
	// 		var values = eventHandlers.filter.getValues();
	// 		$.get("/movies/filter", values).done(function(html){
	// 			$movieList.html(html).fadeIn().listview("refresh");
	// 			eventHandlers.filter.isBusy = false;
	// 		});
	// 	},
	// 	isBusy: false
	// };
})();