/*global homeDashboard*/

(function () {
  'use strict';
  homeDashboard.filter('timePassedFilter', function (utilityService) {
    return function(data) {
      var returnData = [];
      for (var i = 1; i < data.length; i++) {
        //var seconds = utilityService.getTimeDifferenceSeconds(utilityService.getCurrentTime(), data[i]  );
        //if (seconds > 0) {
        returnData.push(data[i]);
      }
      return returnData;
    };
  });
}());
