/*global homeDashboard*/

(function() {
  'use strict';
  var timeLeftService = function(utilityService) {
    this.utilityService = utilityService;
  };

  timeLeftService.prototype.getDaysPassed = function(startDate) {
    return this.utilityService.getDaysFrom(startDate);
  };

  timeLeftService.prototype.getDaysBetween = function(startDate, endDate) {
    return this.utilityService.getDaysBetween(startDate, endDate);
  };

  homeDashboard.service('timeLeftService', timeLeftService);
}());


