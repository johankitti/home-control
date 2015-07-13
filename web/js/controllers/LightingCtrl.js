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

  LightingCtrl.prototype.updateLightingStatus = function(id, on) {
    console.log('updating for button: ' + on);
    this.lightingService.updateLightingStatus(id);
  };

  LightingCtrl.prototype.updateAllLightingStatus = function(on) {
    this.lightingService.updateAllLightingStatus(on);
  };

  LightingCtrl.prototype.isAllOn = function(onOff) {
    var numOn = 0;
    var numOff = 0;
    for (var i = 0; i < this.lightingService.lamps.length; i++) {
      if (this.lightingService.lamps[i].on) {
        numOn++;
      } else {
        numOff++;
      }
    }

    if (onOff == 'on' && numOn == this.lightingService.lamps.length) {
      return 'btn-primary'
    } else if (onOff == 'off' && numOff == this.lightingService.lamps.length) {
      return 'btn-danger';
    }
  }

  LightingCtrl.prototype.isOn = function(id, onOff) {
    var lamp = {};
    for (var i = 0; i < this.lightingService.lamps.length; i++) {
      if (this.lightingService.lamps[i].id == id) {
        this.lamp = this.lightingService.lamps[i];
        break;
      }
    }
    if (lamp) {
      var isOn = lamp.on;
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
