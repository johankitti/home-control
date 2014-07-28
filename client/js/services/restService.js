/*global homeDashboard*/

(function() {
    'use strict';
    var restService = function($http) {
        this.http = $http;

    };

    //WEATHER REST SERVICES

    restService.prototype.loadWeatherWeek = function(callback) {
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=2675397');
    };

    restService.prototype.loadWeatherNow = function(callback) {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Solna');
    };

    //TRANSPORT REST SERVICES

    restService.prototype.getStationInfo = function() {
        return this.http.get('http://api.sl.se/api2/realtimedepartures.json?key=cc5b7ec9a8c4452cbb2977d3421054a4&siteid=9326&timewindow=%3CTIMEWINDOW%3E');
    };

    homeDashboard.service('restService', restService);

}());