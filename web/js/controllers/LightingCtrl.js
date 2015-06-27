/*global homeDashboard*/

(function() {
  'use strict';
  var LightingCtrl = function(lightingService) {
    this.lightingService = lightingService;
  };

  LightingCtrl.prototype.getLampStatus = function() {
    return this.lightingService.getLampStatus();
  };

  LightingCtrl.prototype.setLampOn = function(index, onOff) {
    this.lightingService.setLampOn(index, onOff);
  };

  homeDashboard.controller('LightingCtrl', LightingCtrl);
}());
