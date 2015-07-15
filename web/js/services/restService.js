/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var restService = function($http) {
    this.http = $http;

    this.latitude = 59.346315;
    this.longitude = 17.975396;
  };

  //LIGHTING REST SERVICES

  restService.prototype.loadLightingInfo = function() {
    return this.http.get('/api/lighting/');
  };

  restService.prototype.updateLightingStatus = function(lamp) {
    this.http.post('/api/lighting/', {lamp: lamp}).
    error(function(data, status, headers, config) {
      console.log('Couldn\'t update lamp.');
    }).
    success(function(data, status, headers, config) {
      console.log('Lamp successfully updated.');
    });
  };

  //WEATHER REST SERVICES

  restService.prototype.loadWeatherWeek = function() {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=2675397');
  };

  restService.prototype.loadWeatherNow = function() {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Solna');
  };

  //TRANSPORT REST SERVICES

  restService.prototype.loadTransportInfo = function(dest, station, type) {
    var exclude = '';
    var extraParams = '&numChg=0&useTrain=0';

    switch(type) {
      case 'metro':
        exclude = extraParams + '&useTram=0&useBus=0';
        break;
      case 'bus':
        exclude = extraParams + '&useTram=0&useMetro=0';
        break;
      case 'tram':
        exclude = extraParams + '&useBus=0&useMetro=0';
        break;
      }
      return this.http.get('/api/transport/' + dest + '/' + station + '/' + exclude);
  };

  //SCHEDULE REST SERVICE

  restService.prototype.loadSchedule = function(email) {
    var d = String(moment().format());
    d = d.split('T')[0];
    var calendarId = email;
    var timeMax = d + 'T23%3A59%3A59%2B02%3A00';
    var timeMin = d + 'T00%3A00%3A00%2B02%3A00';
    return this.http.get('/api/gcal/' + calendarId + '/' + timeMax + '/' + timeMin);
  };

  //INSTAGRAM REST SERVICE
  restService.prototype.loadInstagram = function() {
    return this.http.get('/api/instagram/');
  };

  homeDashboard.service('restService', restService);
}());
