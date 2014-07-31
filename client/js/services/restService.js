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

    restService.prototype.loadWeatherWeek = function(callback) {
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=2675397');
    };

    restService.prototype.loadWeatherNow = function(callback) {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Solna');
    };

    //TRANSPORT REST SERVICES

    restService.prototype.loadStationInfo = function() {
        return this.http.get('http://api.sl.se/api2/realtimedepartures.json?key=cc5b7ec9a8c4452cbb2977d3421054a4&siteid=9326&timewindow=%3CTIMEWINDOW%3E');
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