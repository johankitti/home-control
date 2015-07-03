/*global homeDashboard*/

(function() {
  'use strict';
  var LightingCtrl = function($scope, lightingService, socketService) {
    this.scope = $scope;
    this.lightingService = lightingService;
    this.socketService = socketService;

    this.socketService.on('lightingChange', function(lamp) {
        console.log('Lamp: ' + lamp.name + ' changed to on: ' + lamp.on);
        for (var i = 0; i < this.lightingService.lamps.length; i++) {
          if (this.lightingService.lamps[i].name == lamp.name) {
            this.lightingService.lamps[i] = lamp;
            this.scope.$apply();
            break;
          }
        }
        //console.log(this.lamps)
    }.bind(this));
  };

  LightingCtrl.prototype.getLamp = function(index) {
    return this.lightingService.getLamp(index);
  };

  LightingCtrl.prototype.setLampOnOff = function(index) {
    this.lightingService.setLampOnOff(index);
  };

  LightingCtrl.prototype.isOn = function(index, onOff) {
    if (this.lightingService.lamps[index]) {
      var isOn = this.lightingService.lamps[index].on;
      if (isOn) {
        if (onOff == 'on') {
          return 'btn-primary'
        } else {
          return '';
        }
      } else {
        if (onOff == 'off'){
         return 'btn-danger'
       } else {
         return '';
       }
      }
    }
  };

  homeDashboard.controller('LightingCtrl', LightingCtrl);
}());
