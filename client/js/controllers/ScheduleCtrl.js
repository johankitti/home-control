/*global homeDashboard*/

(function() {
    'use strict';
    var ScheduleCtrl = function(scheduleService) {
        this.scheduleService = scheduleService;

        this.getSchedule();
    };

    ScheduleCtrl.prototype.getSchedule = function() {
        this.scheduleService.loadKittiSchedule(function() {
            this.kittiSchedule = this.scheduleService.getKittiSchedule();
            window.console.log(this.kittiSchedule);
        }.bind(this));

        this.scheduleService.loadToriSchedule(function() {
            this.toriSchedule = this.scheduleService.getToriSchedule();
            window.console.log(this.toriSchedule);
        }.bind(this));
    };

    homeDashboard.controller('ScheduleCtrl', ScheduleCtrl);
}());