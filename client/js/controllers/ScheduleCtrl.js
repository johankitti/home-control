/*global homeDashboard*/

(function() {
    'use strict';
    var ScheduleCtrl = function(scheduleService) {
      this.scheduleService = scheduleService;

      this.schedules = [
        {email: 'real.kitti@gmail.com', scheduleData: {}},
        {email: 'grahn.viktoria@gmail.com', scheduleData: {}}
      ];

      this.getSchedule();
    };

    ScheduleCtrl.prototype.getSchedule = function() {
      for (var i = 0; i < this.schedules.length; i++) {
        console.log(this.schedules[i]);
        this.scheduleService.loadSchedule(this.schedules[i].email, function(i) {
          this.schedules[i].scheduleData = this.scheduleService.getSchedule();
        }.bind(this, i));
      }
    };

    homeDashboard.controller('ScheduleCtrl', ScheduleCtrl);
}());
