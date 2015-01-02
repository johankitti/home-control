/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var utilityService = function($http) {
    this.http = $http;

    this.dates = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];

    this.timeFormat = 'HH:mm:ss';
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

  utilityService.prototype.getTimeDifferenceSeconds = function(firstTime, secondTime) {
    if (firstTime && secondTime) {
      var timeSplit1 = firstTime.split(':');
      var timeSplit2 = secondTime.split(':');
      var a = moment([2001, 0, 28, timeSplit1[0], timeSplit1[1], timeSplit1[2]]);
      var b = moment([2001, 0, 28, timeSplit2[0], timeSplit2[1], timeSplit2[2]]);
      return b.diff(a, 'seconds');
    }
  };

  utilityService.prototype.getCurrentTime = function() {
    //return moment().add(6, 'hours').format(this.timeFormat);
    return moment().add(1, 'hours').format(this.timeFormat);
  };

  homeDashboard.service('utilityService', utilityService);

}());
