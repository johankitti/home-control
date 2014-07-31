/*global homeDashboard*/

(function() {
    'use strict';
    var utilityService = function($http) {
        this.http = $http;

        this.dates = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    };
    utilityService.prototype.fromKalvinToCelcius = function(kalvin) {
        return (kalvin - 273.15);
    };

    utilityService.prototype.getWeekDay = function(day) {
        var d = new Date();
        return this.dates[(d.getDay() + day) % 7];
    };

    utilityService.prototype.getDate = function() {
        return new Date();
    };

    homeDashboard.service('utilityService', utilityService);

}());