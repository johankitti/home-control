/*global homeDashboard*/

(function() {
    'use strict';
    var transportService = function(restService) {
        this.restService = restService;
    };

    transportService.prototype.getStationInfo = function() {
        this.restService.getStationInfo()
            .success(function(data) {
                window.console.log(data);
            })
            .error(function() {

            });
    };

    homeDashboard.service('transportService', transportService);
}());