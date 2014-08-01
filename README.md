home-control
============
dashboard for your home



/* ANGULAR stuff */
============

General guidelines
============
- $scope is only to be used when there is no other way to solve a problem
- In html, controllers are declared like: "AppCtrl as appCtrl".

Controllers/Services
============
```
(function () {
    'use strict';
    var AppCtrl = function ($scope, someService) {
	//var appService = function ($scope, someOtherService) {
        this.scope = $scope;
    
        this.someService = someService;
    };

    AppCtrl.prototype.aNiceFunction = function() {
		//Do stuff here
    };
    
    yourAmazingApp.controller('AppCtrl', AppCtrl);
    //yourAmazingApp.service('appService', appService);
}());
```

Filters
============
```
(function () {
    'use strict';
    yourAmazingApp.filter('someFilter', function () {
        return function(data) {
            //Do some stuff with data
            return data;
        };
    });
}());
```
