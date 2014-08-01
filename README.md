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
        this.scope = $scope;
    
        this.someService = someService;
    };

    AppCtrl.prototype.aNiceFunction = function() {
		//Do stuff here
    };
    
    yourAmazingApp.controller('AppCtrl', AppCtrl);
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
