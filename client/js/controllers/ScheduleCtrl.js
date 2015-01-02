/*global homeDashboard*/

(function() {
  'use strict';
  var ScheduleCtrl = function($timeout, scheduleService) {
    this.timeout = $timeout;
    this.scheduleService = scheduleService;

    this.schedules = [
      {email: 'real.kitti@gmail.com', scheduleData: {}},
      {email: 'grahn.viktoria@gmail.com', scheduleData: {}}
    ];

    this.scheduleUpdateFrequency = 60; //minutes

    this.getSchedule();
    this.update();
  };

  ScheduleCtrl.prototype.getSchedule = function() {
    for (var i = 0; i < this.schedules.length; i++) {
      console.log(this.schedules[i]);
      this.scheduleService.loadSchedule(this.schedules[i].email, function(i) {
        this.schedules[i].scheduleData = this.scheduleService.getSchedule();
      }.bind(this, i));
    }
  };

  ScheduleCtrl.prototype.update = function() {
    this.timeout(function () {
      this.getSchedule();
      this.update();
    }.bind(this), 60000 * this.scheduleUpdateFrequency);
  };

  homeDashboard.controller('ScheduleCtrl', ScheduleCtrl);
}());
