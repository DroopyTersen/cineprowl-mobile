var express = require('express'),
	http = require('http'),
	hbs = require("hbs"),
	passport = require("passport"),
	config = require("./config");



var app = express();
require("./authentication").init(app, passport);

//app.set('port', config.port);

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
app.use(express.cookieParser());
app.use(express.session({secret: "mySecret"}));
app.use(express.static(__dirname + "\\public"));


// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//Setup routes
require("./router").configureRoutes(app, passport);
app.use(express.static("public"));

app.use(app.router);

var port = process.env.PORT || config.port;
app.listen(process.env.PORT, process.env.IP);
console.log("CineProwl started on port " + port);