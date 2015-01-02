/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var http = require('http');

module.exports = function(app) {

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
    var url = '/api2/TravelplannerV2/trip.%3CFORMAT%3E?key=' + req.params.key + '&originId=' + req.params.station +
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

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
  });
};
