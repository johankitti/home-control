/*global homeDashboard*/

(function() {
    'use strict';
    var converterService = function($http) {
        this.http = $http;

        this.dates = [
            'Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
    };
    converterService.prototype.fromKalvinToCelcius = function(kalvin) {
        return (kalvin - 273.15);
    };

    converterService.prototype.getWeekDay = function(day) {
        var d = new Date();
        return this.dates[d.getDay() + day];
    };

    homeDashboard.service('converterService', converterService);

}());