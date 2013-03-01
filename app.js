/**
 * Module dependencies.
 */

var express = require('express')
	, http = require('http')
	, path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var manager = require('./rooms').createManager();

app.configure(function() {
	app.set('manager', manager);
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.locals.pretty = true;

app.configure('development', function() {
	app.use(express.errorHandler());
});

// configura as rotas e os endpoints
require('./routes/room')(app, io);
require('./socket')(app, io);

server.listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});