var imageHelper = require("../utils/imageHelper");
var Person = function (person, owned) {
	"use strict";

	this.name = person.name;
	var date = new Date(person.birthday);
	this.birthday = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();
	this.birthPlace = person.place_of_birth;
	this.biography = person.biography;

	this.profileImage = imageHelper.profile.getMid(person.profile_path);

	var ownedMap = {};
	owned.forEach(function(movie) {
		ownedMap[movie.id] = true;
	});

	this.filmography = person.credits.cast.map(function(movie){
		var date = new Date(movie.release_date);
		var owned = (ownedMap[movie.id] === true);
		var url = owned ? "/movies/details/" : "http://www.themoviedb.org/movie/";
		url += movie.id;
		return {
			url:  url,
			title: movie.title,
			owned: owned,
			character: movie.character,
			posterUrl: imageHelper.poster.getThumb(movie.poster_path),
			release: (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(),
			releaseStr: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
		};
	});
	this.filmography = this.filmography.sort(function(a, b) {
		return a.releaseStr < b.releaseStr ? 1 : -1;
	});
};

module.exports = Person;