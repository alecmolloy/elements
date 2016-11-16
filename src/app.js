var clc = require("cli-color"),
	compression = require("compression"),
	express = require('express'),
	http = require("http"),
	logger = require("morgan"),
	pug = require("pug");

var app = express(),
	port = process.env.PORT || 3000;

app.set("port", port);
app.set("views", __dirname + "/views");
app.set("view engine", "pug");
app.use(compression());
app.use(logger("dev"));
app.use(express.static(__dirname + "/public"));
app.use("/", require("./routes/"));
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.locals.basedir = __dirname;

http.createServer(app).listen(app.get('port'), function () {
	console.log(clc.green("Listening on http port " + app.get('port')));
});