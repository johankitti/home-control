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

  utilityService.prototype.getFormatedDate = function() {
    return moment().lang('fr').format('dddd, Do MMMM YYYY');
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
    return moment().format(this.timeFormat);
  };

  utilityService.prototype.getDaysBetween = function(startDate, endDate) {
    var a = moment([endDate.substring(0,4), endDate.substring(4,6), endDate.substring(6)]);
    var b = moment([startDate.substring(0,4), startDate.substring(4,6), startDate.substring(6)]);
    return Math.abs(b.diff(a, 'days'));
  };

  utilityService.prototype.getDaysFrom = function(fromDate) {
    var nowDate = moment().format('YYYYMMDD');
    return this.getDaysBetween(nowDate, fromDate);
  };

  homeDashboard.service('utilityService', utilityService);

}());
