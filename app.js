'use strict';

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var socket = require('socket.io');

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
app.get('/tjena', function(req, res){
	res.status(200);
  res.send('hello world');
});

// LIGHTING API
var lamps = [
	{name: 'Hallen', on: false},
	{name: 'Vardagsrum (Slinga)', on: false},
	{name: 'Vardagsrum (Golv)', on: false},
	{name: 'Vardagsrum (Fönster)', on: true},
	{name: 'Kök (Fönster)', on: false},
	{name: 'Kök (Matbord)', on: false},
	{name: 'Sovrum', on: false}
];

app.get('/api/lighting', function(req, res) {
	res.send(lamps);
});

app.post('/api/lighting/', function(req, res) {
	var lamp = req.body.lamp;
	//console.log('Updating lighting status:', lamp);
	for (var i = 0; i < lamps.length; i++) {
		if (lamps[i].name == lamp.name) {
			lamps[i].on = !lamps[i].on;
			break;
		}
	}
	console.log('Changed lamp: ' + lamp.name + ' to on:' + lamp.on);
	io.emit('lightingChange', lamp);
	res.status(200);
	res.send();
});

// INSTAGRAM API
app.get('/api/instagram/:key/:secret/:user', function(req, res) {
  var ig = require('instagram-node-lib');
  ig.set('client_id', req.params.key);
  ig.users.recent({
    user_id: req.params.user,
    complete: function(data) {
      res.send(data);
    }
  });
});

// TRANSPORT API
app.get('/api/transport/:key/:dest/:station/:exclude', function(req, res) {
  var url = '/api2/TravelplannerV2/trip.json?key=' + req.params.key + '&originId=' + req.params.station +
    '&destId=' + req.params.dest + req.params.exclude;

  console.log(url);
  var options = {
    host: 'api.sl.se',
    path: url
  };

  http.request(options, function(response) {
    var str = '';

    //another chunk of data has been recieved, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });

    //the whole response has been recieved, so we just print it out here
    response.on('end', function () {
      res.send(str);
    });
  }).end();
});

app.route('/lighting')
  .get(function(req, res) {
	res.sendfile("lighting-control.html", { root: __dirname + "/web" });
});
