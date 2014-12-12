/*global homeDashboard*/
/*global moment*/

(function() {
    'use strict';
    var restService = function($http) {
        this.http = $http;

        this.latitude = 59.346315;
        this.longitude = 17.975396;
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
      var key = '1bb9289097dc4600aa260b49b9363245';
      var destination = dest;
      var fromStation = station;
      var exclude = '';
      var transportType = type;

      switch(transportType) {
          case 'metro':
              exclude += '&useTram=0';
              exclude += '&useBus=0';
              break;
          case 'bus':
              exclude += '&useTram=0';
              exclude += '&useMetro=0';
              break;
          case 'tram':
              exclude += '&useBus=0';
              exclude += '&useMetro=0';
              break;
      }
      return this.http.get('http://www.corsproxy.com/api.sl.se/api2/TravelplannerV2/trip.%3CFORMAT%3E?key=' + key + '&originId=' + fromStation + '&destId=' + destination + exclude);
    };

    //SCHEDULE REST SERVICE

    restService.prototype.loadKittiSchedule = function() {
        var d = String(moment().format());
        d = d.split('T')[0];
        var calendarId = 'real.kitti%40gmail.com';
        var timeMax = d + 'T23%3A59%3A59%2B02%3A00';
        var timeMin = d + 'T00%3A00%3A00%2B02%3A00';
        var apiKey = 'AIzaSyDyP7EFmzjuK6Z9TqSbbhVLOIQRgBNmdYI';
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?timeMax=' + timeMax + '&timeMin=' + timeMin + '&key=' + apiKey;
        return this.http.get(url);
    };

    restService.prototype.loadToriSchedule = function() {
        var d = String(moment().format());
        d = d.split('T')[0];
        var calendarId = 'real.kitti%40gmail.com';
        var timeMax = d + 'T23%3A59%3A59%2B02%3A00';
        var timeMin = d + 'T00%3A00%3A00%2B02%3A00';
        var apiKey = 'AIzaSyDyP7EFmzjuK6Z9TqSbbhVLOIQRgBNmdYI';
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?timeMax=' + timeMax + '&timeMin=' + timeMin + '&key=' + apiKey;
        return this.http.get(url);
    };

    homeDashboard.service('restService', restService);

}());
