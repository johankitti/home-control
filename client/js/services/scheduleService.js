/*global homeDashboard*/

(function() {
    'use strict';
    var scheduleService = function(restService, utilityService) {
        this.restService = restService;
        this.utilityService = utilityService;
    };

    scheduleService.prototype.getKittiSchedule = function() {
        return this.kittiSchedule;
    };

    scheduleService.prototype.getToriSchedule = function() {
        return this.toriSchedule;
    };

    scheduleService.prototype.loadKittiSchedule = function(callback) {
        this.restService.loadKittiSchedule()
            .success(function(data) {
                this.kittiSchedule = data;
                callback();
            }.bind(this))
            .error(function(){
                window.console.log('Couldnt load schedule data.');
            });
    };

    scheduleService.prototype.loadToriSchedule = function(callback) {
        this.restService.loadToriSchedule()
            .success(function(data) {
                this.toriSchedule = data;
                callback();
            }.bind(this))
            .error(function(){
                window.console.log('Couldnt load schedule data.');
            });
    };

    homeDashboard.service('scheduleService', scheduleService);
}());


