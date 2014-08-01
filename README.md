home-control
============
dashboard for your home



/* ANGULAR stuff */
============

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
