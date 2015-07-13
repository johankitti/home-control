/*global homeDashboard*/

(function() {
  'use strict';
  var lightingService = function(restService, socketService) {
    this.restService = restService;
    this.socketService = socketService;

    this.lamps = [];
    this.init();
  };

  lightingService.prototype.init = function() {
    this.loadLightingInfo();
  };

  lightingService.prototype.updateLightingStatus = function(id, on) {
    var index = -1;
    for (var i = 0; i < this.lamps.length; i++) {
      if (this.lamps[i].id == id) {
        index = i;
        break;
      }
    }
    var on = this.lamps[index].on;
    if (on == true) {
      this.lamps[index].on = false;
    } else {
      this.lamps[index].on = true;
    }
    this.restService.updateLightingStatus(this.lamps[index]);
  };

  lightingService.prototype.updateAllLightingStatus = function(on) {
    var state = false;
    if (on == true) {
      state = true;
    }
    for (var i = 0; i < this.lamps.length; i++) {
      var lamp = this.lamps[i];
      if (lamp.on != state) {
        this.updateLightingStatus(lamp.id, state);
      }
    }
  };

  lightingService.prototype.loadLightingInfo = function() {
    this.lamps = this.restService.loadLightingInfo();
    this.restService.loadLightingInfo()
        .success(function(data) {
            this.lamps = data
        }.bind(this))
        .error(function(){
          window.console.log('Couldn\'t load lighting info.');
        });
  };

  lightingService.prototype.getLamp = function(index) {
    return this.lamps[index];
  };

  homeDashboard.service('lightingService', lightingService);
}());
