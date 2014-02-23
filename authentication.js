var	GoogleStrategy = require("passport-google").Strategy,
	config = require("./config");

var findUser = function(profile, callback) {
	var match = false;
	for (var i = 0; i < profile.emails.length; i++) {
		if (config.users[profile.emails[i].value]) {
			match = true;
			break;
		}
	}
	var error = !match ? "User Not Found: Contact Andrew if you have a reason to be here." : null;
	callback(error, profile);
};

var checkAuth = function(req, res, next) {
	if (!req.session.userProfile) {
		//res.send('You are not authorized to view this page');
		res.redirect("/login");
	} else {
		next();
	}
};

var configureRoutes = function(app, passport) {
	app.get('/login', passport.authenticate('google'));

	app.get('/auth/google/return', function(req, res, next) {
		passport.authenticate('google', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (!user) {
				res.send("Sorry couldn't log you in. Talk to Andrew if you think you should be here.");
			}
			req.session.userProfile = user;
			res.redirect("/");
		})(req, res, next);
	});
};

var init = function(app, passport) {
	passport.use(new GoogleStrategy({
			returnURL: config.url + config.port + '/auth/google/return',
			realm: config.url + config.port
		},
		function(identifier, profile, done) {
			findUser(profile, function(err, user) {
				done(err, user);
			});
		}
	));	
	app.use(passport.initialize());
};

module.exports = {
	init: init,
	check: checkAuth,
	configureRoutes: configureRoutes
};
