About
============
A dashboard for your home.

Raspberry Pi
============
/etc/init.d/node-autostart.sh - to autostart node server create the following file:

```bash
#! /bin/sh
# /etc/init.d/node-autostart

### BEGIN INIT INFO
# Provides:          node-sautostart
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
### END INIT INFO

/usr/local/bin/node /home/pi/Desktop/2014/home-control/app.js 8080
node /home/pi/Desktop/2014/home-control/app.js 8080
exit 0
```

Make the file executable and register it to autostart with:

```
$ sudo chmod 755 node-autostart.sh
$ sudo update-rc.d node-autostart.sh defaults
```

/etc/xdg/lxsession/LXDE-pi/autostart - to autostart Chromium add the following lines (needs unclutter app installed. sudo apt-get install unclutter):

```
@/usr/bin/chromium --kiosk --start-maximized localhost:8080
@unclutter
```


Modules
============
- Weather (based on open weather API)
- Daily calendar (google calendar API)

Module proposals
============
- Public transportation
- Food trucks. Any foodtrucks near?

General guidelines
============
- $scope is only to be used when there is no other way to solve a problem
- In html, controllers are declared like: "AppCtrl as appCtrl".

iOS/Android Lighting App
============
Applications for both iOS and Android are now available to control the lighting.

Controllers/Services
============
```javascript
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
```javascript
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
