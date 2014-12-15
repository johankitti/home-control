/*global homeDashboard*/

(function() {
  'use strict';
  var HeaderCtrl = function(utilityService) {
    this.utilityService = utilityService;
  };

  HeaderCtrl.prototype.getCurrentTime = function() {
    return this.utilityService.getCurrentTime();
  };

  homeDashboard.controller('HeaderCtrl', HeaderCtrl);
}());
