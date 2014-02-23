(function(angular) {
	"use strict";

	var vlcService = function($http) {

		var vlcRequest = function(action, value) {
			var url = "/NowPlaying/vlc/" + action;
			if (value) {
				url += "?value=" + value;
			}
			return $http.get(url);
		};

		return {
			vlcRequest: vlcRequest
		};
	};

	var nowPlayingController = function($scope, vlcService) {
		$scope.initComplete = false;
		$scope.vlcStatus = null;
		$scope.controls = {
			togglePause: function() {
				$scope.vlcStatus.state = $scope.vlcStatus.state === "playing" ? "paused" : "playing";
				vlcService.vlcRequest("togglePause").success(updateScope);
			},
			seek: function(e) {
				var multiplier = e.offsetX / e.delegateTarget.clientWidth;
				var seekValue = (multiplier * $scope.vlcStatus.duration).toFixed(0);
				vlcService.vlcRequest("seek", seekValue).success(updateScope);
				$scope.vlcStatus.percentageDone = (multiplier * 100).toFixed(3) + "%";
			},
			volume: function(e) {
				if (e.target.tagName === "IMG") {
					e.offsetX = e.offsetX + e.target.offsetLeft;
				}
				var clickX = e.offsetX;
				var totalWidth = e.delegateTarget.clientWidth;
				var newVolume = (clickX * 125 / totalWidth).toFixed(0);
				vlcService.vlcRequest("volume", newVolume);
				//update immediately
				$scope.vlcStatus.volumePercent = ((clickX / totalWidth) * 100).toFixed(1) + "%";
			},
			stepBack: function() {
				vlcService.vlcRequest("seek", $scope.vlcStatus.time - 60).success(updateScope);
			},
			bigStepBack: function() {
				vlcService.vlcRequest("seek", $scope.vlcStatus.time - (60 * 5)).success(updateScope);
			},
			stepForward: function() {
				vlcService.vlcRequest("seek", $scope.vlcStatus.time + 60).success(updateScope);
			},
			bigStepForward: function() {
				vlcService.vlcRequest("seek", $scope.vlcStatus.time + (60 * 5)).success(updateScope);
			},
			fullscreen: function() {
				vlcService.vlcRequest("fullscreen").success(updateScope);
			}
		};

		var updateScope = function(data) {
			$scope.vlcStatus = data.vlcStatus;
			$scope.movie = data.movie;
			$scope.vlcStatus.time = parseInt($scope.vlcStatus.time, 10);
			$scope.vlcStatus.volumePercent = (parseInt($scope.vlcStatus.volume, 10) * 100 / 125).toFixed(1) + "%";
			$scope.vlcStatus.percentageDone = ($scope.vlcStatus.position * 100).toFixed(3) + "%";
			$scope.controls.pauseToggle = $scope.vlcStatus.state === "playing" ? "pause" : "play";
		};


		var init = function() {
			vlcService.vlcRequest("status")
			.error(function(){
				$scope.vlcStatus = null;
			}).success(function(status){
				updateScope(status);
				setInterval(function() {
					vlcService.vlcRequest("status").success(updateScope);
				}, 1000);				
			})
			.finally(function() {
				$scope.initComplete = true;
			});
		};

		init();
	};

	var app = angular.module("nowPlaying", []);
	app.config(function($interpolateProvider) {
		$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
	});
	app.factory("vlcService", vlcService);
	app.controller("nowPlayingController", nowPlayingController);
})(angular);