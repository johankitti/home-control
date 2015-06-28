/*global homeDashboard*/
/*global moment*/

(function() {
  'use strict';
  var socketService = function($rootScope) {
    this.rootScope = $rootScope;
    this.socket = io.connect();
  };

  socketService.prototype.on = function (eventName, data, callback) {
    this.socket.on(eventName, data, function () {
      this.rootScope.$apply(function () {
        callback(data);
      }.bind(this));
    }.bind(this));
  };

  homeDashboard.service('socketService', socketService);
}());
