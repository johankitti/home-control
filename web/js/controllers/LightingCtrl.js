/*global homeDashboard*/

(function() {
  'use strict';
  var LightingCtrl = function(lightingService, socketService) {
    this.lightingService = lightingService;
    this.socketService = socketService;
  };

  LightingCtrl.prototype.updateLightingStatus = function() {
    this.lightingService.updateLightingStatus();
  };

  LightingCtrl.prototype.getLamp = function(index) {
    return this.lightingService.getLamp(index);
  };

  LightingCtrl.prototype.setLampOnOff = function(index) {
    this.lightingService.setLampOnOff(index);
  };

  homeDashboard.controller('LightingCtrl', LightingCtrl);
}());
