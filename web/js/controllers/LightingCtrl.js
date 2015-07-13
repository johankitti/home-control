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
    this.lightingService.updateLightingStatus(id, on);
  };

  LightingCtrl.prototype.updateAllLightingStatus = function(on) {
    this.lightingService.updateAllLightingStatus(on);
  };

  LightingCtrl.prototype.isAllOn = function(on) {
    var numOn = 0;
    var numOff = 0;
    for (var i = 0; i < this.lightingService.lamps.length; i++) {
      if (this.lightingService.lamps[i].on) {
        numOn++;
      } else {
        numOff++;
      }
    }

    if (on == true && numOn == this.lightingService.lamps.length) {
      return 'btn-primary'
    } else if (on == false && numOff == this.lightingService.lamps.length) {
      return 'btn-danger';
    }
  }

  LightingCtrl.prototype.isOn = function(id, on) {
    var index = -1;
    for (var i = 0; i < this.lightingService.lamps.length; i++) {
      if (this.lightingService.lamps[i].id == id) {
        index = i;
        break;
      }
    }
    if (this.lightingService.lamps[i]) {
      var isOn = this.lightingService.lamps[i].on;
      if (isOn) {
        if (on == true) {
          return 'btn-primary'
        } else {
          return '';
        }
      } else {
        if (on == false){
         return 'btn-danger'
       } else {
         return '';
       }
      }
    }
  };

  homeDashboard.controller('LightingCtrl', LightingCtrl);
}());
