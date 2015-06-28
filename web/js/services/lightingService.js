/*global homeDashboard*/

(function() {
  'use strict';
  var lightingService = function(restService, socketService) {
    this.restService = restService;
    this.socketService = socketService;

    this.socketService.on('lightingChange', function(lamps) {
        console.log('there was a change in ligting!');
        this.data.lamps = lamps;
    }.bind(this));

    this.data = {lamps: []};
    this.init();
  };

  lightingService.prototype.init = function() {
    this.loadLightingInfo();
  };

  lightingService.prototype.updateLightingStatus = function() {
    //console.log(this.lamps);
    if (this.restService.updateLightingStatus(this.data.lamps, function(success) {
      if (success) {

      }
    }));
  };

  lightingService.prototype.loadLightingInfo = function() {
    this.data.lamps = this.restService.loadLightingInfo();
    this.restService.loadLightingInfo()
        .success(function(data) {
            window.console.log(data);
            this.data.lamps = data
        }.bind(this))
        .error(function(){
          window.console.log('Couldn\'t load lighting info.');
        });
  };

  lightingService.prototype.getLamp = function(index) {
    return this.data.lamps[index];
  };

  lightingService.prototype.setLampOnOff = function(index) {
    console.log(this.data.lamps[index]);
    if (this.data.lamps[index].on == true) {
      this.data.lamps[index].on = false;
    } else {
      this.data.lamps[index].on = true;
    }
    console.log(this.data.lamps[index]);
  };

  homeDashboard.service('lightingService', lightingService);
}());
