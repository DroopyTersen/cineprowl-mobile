//Object
module.exports = {
	configureRoutes: function(app) {
		"use strict";
		var controllers = require("./controllers");

		app.get("/", controllers.home.index);

		app.get("/:controller/:action/:id", function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});
		
		app.get("/:controller/:action", function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});

		app.get("/:controller", function(req, res) {
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