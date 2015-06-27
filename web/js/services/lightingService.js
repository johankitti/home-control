/*global homeDashboard*/

(function() {
  'use strict';
  var lightingService = function() {
    this.lamps = [
      {name: 'Hallen', on: true},
      {name: 'Vardagsrum (Slinga)', on: true, main: true},
      {name: 'Vardagsrum (Golv)', on: true},
      {name: 'Vardagsrum (Fönster)', on: true},
      {name: 'Kök (Fönster)', on: true},
      {name: 'Kök (Matbord)', on: true},
      {name: 'Sovrum', on: true}
    ];
  };

  lightingService.prototype.getLampStatus = function() {
    return this.lamps;
  };

  lightingService.prototype.setLampOn = function(index, onOff) {
    this.lamps[index].on = onOff;
  };

  lightingService.prototype.setLampMain = function(index, main) {
    this.lamps[index].main = main;
  };

  homeDashboard.service('lightingService', lightingService);
}());


