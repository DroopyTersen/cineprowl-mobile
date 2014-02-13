var infiniteScroll = (function() {
	var $window = $(window),
		$document = $(document),
		distance = 150,
		infiniteScroll = {};

	var checkScrollPosition = function() {
		var top = $document.height() - $window.height() - distance;

		if ($window.scrollTop() > 0 && $window.scrollTop() >= top) {
			$(document).trigger("loadMore");
		}
	};

	infiniteScroll.init = function() {
		infiniteScroll.interval = setInterval(checkScrollPosition, 300);
		infiniteScroll.active = true;
	};

	infiniteScroll.clear = function() {
		if (infiniteScroll.active) {
			clearInterval(infiniteScroll.interval);
		}
	};
	return infiniteScroll;
})();