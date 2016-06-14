app.controller('student', ['$timeout', '$scope', '$state', '$stateParams', '$calendar', 'uiCalendarConfig', function($timeout, $scope, $state, $stateParams, $calendar, uiCalendarConfig) {

var id = $stateParams.id;

var date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();

$scope.events = [];
$scope.firstCourse = '';
$scope.selectStartDate = '2015-09-09';

$calendar.getSchedule(id).then(function (result) {
  $scope.course = result.data;
  angular.forEach(result.data.content, function(val, index) {
    if ($scope.selectStartDate === '1499-09-09'){
      if(val.start <= moment().format('YYYY-MM-DD')){
        $scope.selectStartDate = angular.copy(val.start);
      }
    }
    $scope.events.push(val);
  });
  $timeout(function () {
    colorizeCalendar();
  });
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
      left: 'title',
      center: '',
      right: viewflag+' today prev,next',
    },
    dayClick: $scope.goToRootScopeDate,
    defaultDate: $scope.selectStartDate
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
