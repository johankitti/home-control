/*global homeDashboard*/

(function() {
    'use strict';
    var WeatherCtrl = function($timeout, weatherService, converterService) {
        this.timeout = $timeout;

        this.weatherService = weatherService;
        this.converterService = converterService;

        this.weatherUpdateFrequency = 3; //minutes
        this.getWeather();
        this.update();
    };

    WeatherCtrl.prototype.getWeather = function() {
        this.weatherService.loadWeatherNow(function() {
            this.weatherNow = this.weatherService.getWeatherNow();
            window.console.log(this.weatherNow);
        }.bind(this));

        this.weatherService.loadWeatherWeek(function() {
            this.weatherWeek = this.weatherService.getWeatherWeek();
            window.console.log(this.weatherWeek);
        }.bind(this));
    };

    WeatherCtrl.prototype.update = function() {
        this.timeout(function() {
            this.getWeather();
            this.update();
        }.bind(this), 60000 * this.weatherUpdateFrequency);
    };

    WeatherCtrl.prototype.fromKalvinToCelcius = function(kalvin) {
        return this.converterService.fromKalvinToCelcius(kalvin);
    };

    WeatherCtrl.prototype.getWeekDay = function(day) {
        // 0 = today, 1 = tomorrow.... etc
        return this.converterService.getWeekDay(day);
    };

    WeatherCtrl.prototype.getWeatherIcon = function(weatherId) {
        return this.weatherService.getWeatherIcon(weatherId);
    };

    homeDashboard.controller('WeatherCtrl', WeatherCtrl);
}());