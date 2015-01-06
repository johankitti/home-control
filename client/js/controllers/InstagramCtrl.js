/*global homeDashboard*/

(function() {
  'use strict';
  var InstagramCtrl = function($timeout, instagramService, utilityService) {
    this.timeout = $timeout;

    this.instagramService = instagramService;
    this.utilityService = utilityService;

    this.instagramUpdateFrequency = 60; //minutes
    this.instagramUpdateImgFrequency = 20; //Sekunder

    this.instagram = [
      {
        images: {
          standard_resolution: {
            url: 'tjena'
          }},
        user: {
          username: 'fruktprins'
        }
      }
    ];

    this.currentImg = 0;

    this.getInstagram();
    this.update();
    this.updateImg();
  };

  InstagramCtrl.prototype.getInstagram = function() {
    this.instagramService.loadInstagram(function() {
      this.instagram = this.instagramService.getInstagram();
      //window.console.log(this.instagram);
    }.bind(this));
  };

  InstagramCtrl.prototype.getLatestImg = function() {
    if (this.instagram[this.currentImg] !== null) {
      return this.instagram[this.currentImg].images.standard_resolution.url;
    }
    else {
      return null;
    }
  };

  InstagramCtrl.prototype.getUsername = function() {
    if (this.instagram[0] !== null) {
      return this.instagram[0].user.username;
    }
    else {
      return "";
    }
  };


  InstagramCtrl.prototype.update = function() {
    this.timeout(function () {
      this.getInstagram();
      this.update();
    }.bind(this), 60000 * this.instagramUpdateFrequency);
  };

  InstagramCtrl.prototype.updateImg = function() {
    this.timeout(function () {
      this.currentImg += 1;
      this.currentImg = this.currentImg % 20;
      //window.console.log(this.currentImg);
      this.updateImg();
    }.bind(this), 1000 * this.instagramUpdateImgFrequency);
  };

  homeDashboard.controller('InstagramCtrl', InstagramCtrl);
}());
