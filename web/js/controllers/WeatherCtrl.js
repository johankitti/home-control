/*global homeDashboard*/

(function() {
    'use strict';
    var WeatherCtrl = function($timeout, weatherService, utilityService) {
        this.timeout = $timeout;

        this.weatherService = weatherService;
        this.utilityService = utilityService;

        this.weatherUpdateFrequency = 3; //minutes
        this.getWeather();
        this.update();
    };

    WeatherCtrl.prototype.update = function() {
        this.timeout(function() {
            this.getWeather();
            this.update();
        }.bind(this), 60000 * this.weatherUpdateFrequency);
    };

    WeatherCtrl.prototype.getWeather = function() {
        this.weatherService.loadWeatherNow(function() {
            this.weatherNow = this.weatherService.getWeatherNow();
           //window.console.log(this.weatherNow);
        }.bind(this));

        this.weatherService.loadWeatherWeek(function() {
            this.weatherWeek = this.weatherService.getWeatherWeek();
            //window.console.log(this.weatherWeek);
        }.bind(this));
    };

    WeatherCtrl.prototype.fromKalvinToCelcius = function(kalvin) {
        return this.utilityService.fromKalvinToCelcius(kalvin);
    };

    WeatherCtrl.prototype.getWeekDay = function(day) {
        // 0 = today, 1 = tomorrow.... etc
        return this.utilityService.getWeekDay(day);
    };

    WeatherCtrl.prototype.getWeatherIcon = function(weatherId) {
        return this.weatherService.getWeatherIcon(weatherId);
    };

    homeDashboard.controller('WeatherCtrl', WeatherCtrl);
}());
