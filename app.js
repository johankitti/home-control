'use strict';

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var tellstick = require('tellstick');
var os = require('os');
var config = require('./config.json');

// Setup server
var app = express();

app.use("/js", express.static(__dirname + "/web/js"));
app.use("/css", express.static(__dirname + "/web/css"));
app.use("/html", express.static(__dirname + "/web/html"));
app.use("/assets", express.static(__dirname + "/web/assets"));
app.use("/bower_components", express.static(__dirname + "/web/bower_components"));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var WORKERS = process.env.WEB_CONCURRENCY || 1;

var server = app.listen(process.env.PORT || 8080, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Home-Control app is listening at http://%s:%s', host, port);
});

var io = socket.listen(server);

// STATIC CONTENT
app.all("/", function(req, res, next) {
	res.sendfile("index.html", { root: __dirname + "/web" });
});

	// TEST PING
app.get('/ping', function(req, res){
	res.status(200);
  res.send('pong');
});

// GET CONFIG
app.get('/config', function(req, res){
	res.status(200);
	res.send(config);
});

// GCAL API
app.get('/api/gcal/:calendarid/:timemax/:timemin', function(req, res){
	var url = '/calendar/v3/calendars/' +
	req.params.calendarid + '/events?timeMax=' + req.params.timemax +
	'&timeMin=' + req.params.timemin + '&key=' + config.gcal.apiKey;
	res.status(200);

	var options = {
		host: 'https://www.googleapis.com',
		path: url
	};

	http.request(options, function(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      res.send(str);
    });
  }).end();
});

// LIGHTING API
var lamps = [];

app.get('/api/lighting', function(req, res) {
	res.send(lamps);
});

app.post('/api/lighting/', function(req, res) {
	var lamp = req.body.lamp;
	console.log(lamp);
	for (var i = 0; i < lamps.length; i++) {
		if (lamps[i].id == lamp.id) {
			if (lamps[i].on == true) {
				td.turnOff(lamps[i].id, function(err){
				  if(!err) {
						lamps[i].on = false;
						console.log(lamps[i].name + ' is turned off');
					}
				});
			} else {
				td.turnOn(lamps[i].id, function(err){
				  if(!err) {
						lamps[i].on = true;
						console.log(lamps[i].name + ' is turned on');
					}
				});
			}
			break;
		}
	}
	io.emit('lightingChange', lamp);
	res.status(200);
	res.send();
});

// INSTAGRAM API
app.get('/api/instagram/', function(req, res) {
  var ig = require('instagram-node-lib');
  ig.set('client_id', config.instagram.apiKey);
  ig.users.recent({
    user_id: config.instagram.user,
    complete: function(data) {
      res.send(data);
    }
  });
});

// TRANSPORT API
app.get('/api/transport/:dest/:station/:exclude', function(req, res) {
  var url = '/api2/TravelplannerV2/trip.json?key=' + config.transportation.apiKey +
	'&originId=' + req.params.station + '&destId=' + req.params.dest +
	req.params.exclude;

  console.log(url);
  var options = {
    host: 'api.sl.se',
    path: url
  };

  http.request(options, function(response) {
    var str = '';

    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      res.send(str);
    });
  }).end();
});

app.route('/lighting')
  .get(function(req, res) {
	res.sendfile("lighting-control.html", { root: __dirname + "/web" });
});


// tellstickvar
var tdtoolPath = '';
var currOs = os.platform().toLowerCase();
switch (currOs) {
	case 'linux':
		tdtoolPath = '/usr/bin/';
		break;

	case 'darwin':
		tdtoolPath = '/usr/local/bin/';

	default:
		tdtoolPath = '/usr/local/bin/';
}
console.log('You are on a ' + currOs + ' system.');
var td = tellstick(tdtoolPath); // Leave blanc for mac

// list all registered devices and prepare
console.log('Lamps:');
td.list(function(err, list){
	lamps = list;
	if (lamps) {
		for (var i = 0; i < lamps.length; i++) {
			console.log('Name: ' + lamps[i].name + ' is: ' + lamps[i].on);
		}
	}
});
