app.controller('student', ['$scope', '$state', '$stateParams', '$calendar', 'uiCalendarConfig', function($scope, $state, $stateParams, $calendar, uiCalendarConfig) {

var id = $stateParams.id;

var date = new Date(),
    d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();




$scope.events = [];
$scope.firstCourse = '';

$calendar.getSchedule('MWD').then(function (result) {
  $scope.course = result.data;
  angular.forEach(result.data.content, function(val, index) {
    $scope.events.push(val);
    console.log($scope.events);
  });
}).then(function() {
  colorizeCalendar();

});

$scope.changeView = function(view,calendar) {
  uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
};

$scope.eventsF = function (start, end, timezone, callback) {
  var s = new Date(start).getTime() / 1000;
  var e = new Date(end).getTime() / 1000;
  var m = new Date(start).getMonth();
  callback($scope.events);
};

    var viewflag = 'agendaWeek';
    $('.fc-right:nth-child(0) ').on('click', function() {
        console.log(this);
    });

    function changeView() {
        if(viewflag === 'month') {
            viewflag = 'agendaWeek';
        } else {
            viewflag = 'month';
        }
    }

    $scope.uiConfig = {
        calendar: {
          defaultView: "month",
          editable: true,
          header: {
            left: '',
            center: 'title',
            right: viewflag+' today prev,next',
          },
          dayClick: $scope.goToRootScopeDate,
          defaultDate: '2015-05-05'

        },
      };

$scope.eventSources = [$scope.events, $scope.eventsF];

$scope.courses = [];
$calendar.getSchedule()
  .then(function(res) {
    var data = res.data;
    angular.forEach(data, function(val, key) {
      $scope.courses.push({name: key, content: val});
    });
    console.log($scope.courses);
  });

}]);
