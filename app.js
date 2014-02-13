var express = require('express'),
	http = require('http'),
	hbs = require("hbs"),
	config = require("./config");

var app = express();
app.set('port', config.port);

//Setup handlebars view engine
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + "/views/partials");
var hbsHelpers = require("./utils/hbs-helpers");
hbs.registerHelper("isSelected", hbsHelpers.isSelected);
hbs.registerHelper("isChecked", hbsHelpers.isChecked);
hbs.registerHelper("filterValue", hbsHelpers.filterValue);
hbs.registerHelper("tagHelper", hbsHelpers.tagHelper);
app.set('view engine', 'html');
app.engine("html", hbs.__express);

//Middleware
app.use(express.favicon("public/images/favicon.ico"));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.compress());
app.use(express.static(__dirname + "/public"));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


//Setup routes
require("./router").configureRoutes(app);
app.use(express.static("public"));
app.use(app.router);

app.listen(config.port);
console.log("CineProwl started on port " + config.port);