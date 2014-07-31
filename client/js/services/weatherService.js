/*global homeDashboard*/

(function() {
    'use strict';
    var weatherService = function(restService, utilityService) {
        this.restService = restService;
        this.utilityService = utilityService;

        this.weatherIcons = {
            200: 'wi-thunderstorm',
            300: 'wi-showers',
            500: 'wi-rain',
            600: 'wi-snow',
            700: 'wi-fog',
            800: 'wi-day-sunny',
            801: 'wi-cloudy',
            802: 'wi-cloudy',
            803: 'wi-cloudy',
            804: 'wi-cloudy'
        };
    };

    weatherService.prototype.loadWeatherWeek = function(callback) {
        this.restService.loadWeatherWeek()
            .success(function(data) {
                this.weatherWeek = data;
                callback();
            }.bind(this))
            .error(function(){
                window.console.log('Couldnt load weather data.');
            });
    };

    weatherService.prototype.loadWeatherNow = function(callback) {
        this.restService.loadWeatherNow()
            .success(function(data) {
                this.weatherNow = data;
                callback();
            }.bind(this))
            .error(function(){
                window.console.log('Couldnt load weather data.');
            });
    };

    weatherService.prototype.getWeatherNow = function() {
        return this.weatherNow;
    };

    weatherService.prototype.getWeatherWeek = function() {
        return this.weatherWeek;
    };

    weatherService.prototype.getWeatherIcon = function(weatherId) {
        if (weatherId) {
            if (!this.weatherIcons[weatherId]) {
                var temp = weatherId.toString();
                temp = temp.replaceAt(1, '0');
                temp = temp.replaceAt(2, '0');
                weatherId = parseInt(temp);
                //window.console.log(weatherId);
            }
            var d = new Date();

            //Night is between 06.00 and 22.00
            if (weatherId === 800 && (d.getHours() < 6 && d.getHours() > 22)) {
                return 'wi-night-clear';
            }
            else {
                return this.weatherIcons[weatherId];
            }
        }
    };

    // HELP FUNCTION for getWeatherIcon
    String.prototype.replaceAt=function(index, character) {
        return this.substr(0, index) + character + this.substr(index+character.length);
    };

    homeDashboard.service('weatherService', weatherService);

}());