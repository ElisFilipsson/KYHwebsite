app.controller('student', ['$timeout', '$scope', '$state', '$stateParams', '$calendar', 'uiCalendarConfig', function($timeout, $scope, $state, $stateParams, $calendar, uiCalendarConfig) {

var id = $stateParams.id;

var date = new Date(),
  d = date.getDate(),
  m = date.getMonth(),
  y = date.getFullYear();

$scope.events = [];
$scope.tempevents = [];
$scope.firstCourse = '';
$scope.selectStartDate = '2016-06-06';

$calendar.getSchedule(id).then(function (result) {
  $scope.course = result.data;
  angular.forEach(result.data.content, function(val, index) {
    $scope.events.push(val);
    $scope.tempevents.push(val);
  });
  $timeout(function () {
    colorizeCalendar();
  });
});

$scope.changeView = function(view,calendar) {
  $('#calendar').fullCalendar('changeView',view);
};

$scope.eventsF = function (start, end, timezone, callback) {
  var s = new Date(start).getTime() / 1000;
  var e = new Date(end).getTime() / 1000;
  var m = new Date(start).getMonth();
  callback($scope.events);
};

 
    var viewflag = 'agendaWeek';
    $('.cal-display').find('.fc-right').first().on('click', function() {
        console.log(this);
    });

    function changeView() {
        if(viewflag === 'month') {
            viewflag = 'agendaWeek';
        } else {
            viewflag = 'month';
        }
    }

    $scope.getNextCourseDate = function() {
        $calendar.getSchedule(id).then(function (result) {
           var date = '';
           angular.forEach(result.data.content, function(val, index){
              if (date === '') {
                if ( moment().format('YYYY-MM-DD') <= val.start ){
                   date = val.start;
                   $scope.selectStartDate = val.start;
                }
              }
           });
           $scope.events = [];
           $scope.events = angular.copy($scope.tempevents);
           $('#calendar').fullCalendar('gotoDate', date); 
           
        });
    };

    $scope.getNextCourseDate();
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







$scope.classes = [];
$calendar.getSchedule(id)
  .then(function(res) {
    var data = res.data;
    angular.forEach(data.content, function(val, key) {
      $scope.classes.push({id: key, title: val.title});
    });
  });

$scope.courses = [];
$calendar.getSchedule()
   .then(function(res) {
     var data = res.data;
     angular.forEach(data, function(val, key) {
       $scope.courses.push({name: key, content: val});
     });
   });
}]);
