var eventHandlers = {};
var $movieList = $("#movieList");
var sortPage = function() {
	return $(".sortLink.ui-btn-active").attr("href");
};
eventHandlers.search = {
	openSearch: function(e) {
		$("input.searchAutocomplete").focus();
		//bind the form submit lazily
		$("#searchPanel form").on("submit", eventHandlers.submitSearch);
	},
	searchBox: function(e) {
		var searchBox = $("input.searchAutocomplete");
		console.log(searchBox.val());
		if (e.keyCode === 40) {
			var $selected = $('.searchResult:not(:last-child).selected').removeClass('selected').next().addClass('selected');
			return false;
		} else if (e.keyCode === 38) {
			$('.searchResult:not(:first-child).selected').removeClass('selected').prev().addClass('selected');
		} else {
			var searchText = encodeURIComponent(searchBox.val());
			$searchResults = $("#searchResults");
			$searchResults.load("/movies/search/" + searchText, function() {
				$searchResults.closest("[data-role=page]:visible").trigger("create");
				$(".searchResult").first().addClass("selected");
			});
		}
	},
	submitSearch: function(e) {
		e.preventDefault();
		window.location.href = $(".searchResult.selected a").attr("href");
	}
};

eventHandlers.scroll = {
	loadMore: function(e) {
		if (e) e.preventDefault();
		var cacheBuster = "?date=" + (new Date()).toISOString();
		$.get("/movies/more" + cacheBuster, function(html) {
			if (html === "") {
				infiniteScroll.clear();
			} else {
				$("#loadMore").closest("li.ui-btn").remove();
				$("#movieList").append(html).listview("refresh");
			}
		});
	}
};

eventHandlers.vlcToolbar = {
	refreshUI: function(status) {
		var image = "/images/pause-small.png";
		if (status.state !== "playing") {
			image = "/images/play-small.png";
		}

		$("#pause img.play").attr("src", image);
		console.log(status.time);
		$("#time").text(status.time.replace(".", ":"));
		$("#seek").val(status.time).slider("refresh");
		$("#volume").val(status.volume).slider("refresh");
		$('[data-role="page"]').trigger("pagecreate");
	},
	seek: function(e) {
		var val = $("#seek").val();
		val = (val * 60).toFixed(0);
		$.get("/nowplaying/seek/" + val, eventHandlers.vlcToolbar.refreshUI);
	},
	volume: function(e) {
		var val = $("#volume").val();
		console.log(val);
		$.get("/nowplaying/volume/" + val, eventHandlers.vlcToolbar.refreshUI);
	},
	togglePause: function(e) {
		$.get("/nowplaying/togglepause", eventHandlers.vlcToolbar.refreshUI);
	},
	stop: function(e) {
		$.get("nowPlaying/stop", function() { 
			window.location.href = "/";
		});
	}
};


eventHandlers.filter = {

	getValues: function() {
		var filter = {};
		var $filterForm = $("#filterForm");
		//Do not filter if neither or both are checked
		var watchedYes = $("#watched-yes").closest(".ui-checkbox").find(".ui-btn-active").length;
		var watchedNo = $("#watched-no").closest(".ui-checkbox").find(".ui-btn-active").length;
		if (watchedYes && !watchedNo) {
			filter.watched = true;
		} else if (watchedNo && !watchedYes) {
			filter.watched = false;
		}
		//pass null if it is the default value
		var genre = $filterForm.find(".ui-btn-text .filter.genre").text();
		if (genre !== "Genre") filter.genre = genre;

		var mpaa = $filterForm.find(".ui-btn-text .filter.mpaa").text();
		if (mpaa !== "MPAA") filter.mpaa = mpaa;

		var quality = $filterForm.find(".ui-btn-text .filter.quality").text();
		if (quality !== "Quality") filter.quality = quality;

		var releaseMin = $filterForm.find("#releaseMin").val();
		if (releaseMin !== "1920") filter.releaseMin = releaseMin;

		var releaseMax = $filterForm.find("#releaseMax").val();
		if (releaseMax !== "2016") filter.releaseMax = releaseMax;

		return filter;
	},

	submit: function(e) {
		if (e) e.preventDefault();
		$movieList = $("#movieList");
		$movieList.hide();
		$("#filterPanel").panel("close");

		var values = eventHandlers.filter.getValues();
		$.get("/movies/filter", values).done(function(html){
			$movieList.html(html).fadeIn().listview("refresh");
			eventHandlers.filter.isBusy = false;
		});
	},
	isBusy: false
};
var bindEvents = function() {
	$(document).on("submit", "#searchPanel form", eventHandlers.search.submitSearch);
	$(document).on("keyup", "input.searchAutocomplete", eventHandlers.search.searchBox);
	$(document).on("panelopen", "#searchPanel", eventHandlers.search.openSearch);
	//$(document).on("slidestop", "#seek", eventHandlers.vlcToolbar.seek);
	//$(document).on("slidestop", "#volume", eventHandlers.vlcToolbar.volume);
	//$(document).on("click", "#pause", eventHandlers.vlcToolbar.togglePause);
	//$(document).on("click", "#stop", eventHandlers.vlcToolbar.stop);
	$(document).on("loadMore", eventHandlers.scroll.loadMore);
	$("#filterForm").on("submit", eventHandlers.filter.submit);
};

$(document).ready(bindEvents);