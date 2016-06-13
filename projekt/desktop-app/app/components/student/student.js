app.controller('student', ['$scope', '$state', '$stateParams', '$calendar', function($scope, $state, $stateParams, $calendar) {
var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();




$scope.events = [];

$calendar.getSchedule('MWD').then(function (result) {
    $scope.course = result.data;
    
    angular.forEach(result.data.content, function(val, index) {
        $scope.events.push(val);
    });
    console.log($scope.events)
    console.log(result.data.content);
});






$scope.eventSource = {
            url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
            className: 'gcal-event',           // an option!
            currentTimezone: 'America/Chicago' // an option!
};




$scope.eventsF = function (start, end, timezone, callback) {
      var s = new Date(start).getTime() / 1000;
      var e = new Date(end).getTime() / 1000;
      var m = new Date(start).getMonth();
      var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
      callback(events);
};

$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];













  
}]);
