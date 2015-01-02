/*global homeDashboard*/

(function() {
  'use strict';
  var TimeDateCtrl = function(utilityService) {
    this.utilityService = utilityService;
  };

  TimeDateCtrl.prototype.getCurrentTime = function() {
    return this.utilityService.getCurrentTime();
  };

  TimeDateCtrl.prototype.getWeekDay = function(day) {
    return this.utilityService.getWeekDay(day);
  };

  TimeDateCtrl.prototype.getFormatedDate = function() {
    return this.utilityService.getFormatedDate();
  };

  homeDashboard.controller('TimeDateCtrl', TimeDateCtrl);
}());
