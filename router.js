//Object
module.exports = {
	configureRoutes: function(app, passport) {
		"use strict";
		var controllers = require("./controllers");
		var authentication = require("./authentication");
		//authentication.configureRoutes(app, passport);

		app.get("/", controllers.home.index);

		app.get("/:controller/:action/:id",  function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});

		app.get("/:controller/:action", function(req, res) {
			controllers[req.params.controller.toLowerCase()][req.params.action.toLowerCase()](req, res);
		});

		app.get("/:controller", function(req, res) {
			controllers[req.params.controller.toLowerCase()].index(req, res);
		});
	}
};

