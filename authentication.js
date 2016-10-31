var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
	config = require("./config");

var findUser = function(profile, callback) {
	var match = false;
	console.log(profile);
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
	app.get('/login', passport.authenticate('google', {scope: 'email'}));

	app.get('/auth/google/return', function(req, res, next) {
		passport.authenticate('google', { scope: 'email'}, function(err, user, info) {
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
	var env = config.port === 4444 ? "dev" : "prod";
	env = "prod";
	passport.use(new GoogleStrategy({
			clientID: config.googleOAuth[env].clientID,
			clientSecret: config.googleOAuth[env].clientSecret,
			callbackURL: config.googleOAuth[env].callbackHost + '/auth/google/return'
		},
		function(accessToken, refreshToken, profile, done) {
			findUser(profile, function(err, user) {
				return done(err, user);
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