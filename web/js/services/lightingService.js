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

  lightingService.prototype.updateLightingStatus = function(index) {
    this.restService.updateLightingStatus(this.lamps[index]);
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

  lightingService.prototype.setLampOnOff = function(index) {
    //console.log(this.lamps[index]);
    if (this.lamps[index].on == true) {
      this.lamps[index].on = false;
    } else {
      this.lamps[index].on = true;
    }
    this.updateLightingStatus(index);
  };

  homeDashboard.service('lightingService', lightingService);
}());
