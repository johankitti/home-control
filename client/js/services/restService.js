/*global homeDashboard*/
/*global moment*/

(function() {
    'use strict';
    var restService = function($http) {
        this.http = $http;

        this.latitude = 59.346315;
        this.longitude = 17.975396;
    };

    //WEATHER REST SERVICES

    restService.prototype.loadWeatherWeek = function() {
        return this.http.get('http://api.openweathermap.org/data/2.5/forecast/daily?id=2675397');
    };

    restService.prototype.loadWeatherNow = function() {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Solna');
    };

    //TRANSPORT REST SERVICES

    restService.prototype.loadTransportInfo = function(dest, station, type) {
        var key = '1bb9289097dc4600aa260b49b9363245';
        var exclude = '';
        var extraParams = '&numChg=0&useTrain=0';

        switch(type) {
            case 'metro':
                exclude = extraParams + '&useTram=0&useBus=0';
                break;
            case 'bus':
                exclude = extraParams + '&useTram=0&useMetro=0';
                break;
            case 'tram':
              exclude = extraParams + '&useBus=0&useMetro=0';
                break;
        }
        return this.http.get('/api/transport/' + key + '/' + dest + '/' + station + '/' + exclude);
    };

    //SCHEDULE REST SERVICE

    restService.prototype.loadSchedule = function(email) {
        var d = String(moment().format());
        d = d.split('T')[0];
        var calendarId = email;
        var timeMax = d + 'T23%3A59%3A59%2B02%3A00';
        var timeMin = d + 'T00%3A00%3A00%2B02%3A00';
        var apiKey = 'AIzaSyDyP7EFmzjuK6Z9TqSbbhVLOIQRgBNmdYI';
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?timeMax=' + timeMax + '&timeMin=' + timeMin + '&key=' + apiKey;
        return this.http.get(url);
    };

    homeDashboard.service('restService', restService);

}());
