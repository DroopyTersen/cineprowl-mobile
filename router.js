//Object
module.exports = {
	configureRoutes: function(app, passport) {
		"use strict";
		var controllers = require("./controllers");
		var authentication = require("./authentication");
		authentication.configureRoutes(app, passport);

		app.get("/", authentication.check, controllers.home.index);

		app.get("/:controller/:action/:id", authentication.check, function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});

		app.get("/:controller/:action", authentication.check, function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});

		app.get("/:controller", authentication.check, function(req, res) {
			controllers[req.params.controller.toLowerCase()].index(req, res);
		});

		//fall back for 404's
		app.use(function(req, res) {
			res.status(404);
			// respond with html page
			if (req.accepts("html")) {
				res.render("404", {
					url: req.url
				});
				return;
			}
			// respond with json
			if (req.accepts("json")) {
				res.send({
					error: "Not Found"
				});
				return;
			}
		});
	}
};