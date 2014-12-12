/*global homeDashboard*/

(function() {
    'use strict';
    var transportService = function(restService) {
        this.restService = restService;

        this.transportInfo = [];
    };

    transportService.prototype.loadTransportInfo = function(dest, station, type, callback) {
        this.restService.loadTransportInfo(dest, station, type)
            .success(function(data) {
                window.console.log(data.TripList);
                this.transportInfo = data.TripList;
                callback();
            }.bind(this))
            .error(function(){
              window.console.log('Couldn\'t load transport info.');
            });
    };

    transportService.prototype.getTransportInfo = function() {
        return this.transportInfo;
    };

    homeDashboard.service('transportService', transportService);
}());
