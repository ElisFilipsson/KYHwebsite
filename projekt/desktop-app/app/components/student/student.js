app.controller('student', ['$scope', '$state', '$stateParams', '$calendar', 'uiCalendarConfig', function($scope, $state, $stateParams, $calendar, uiCalendarConfig) {

    var id = $stateParams.id;
    if(id === ''){ $state.go('/student', {id: 'MWD'}); }

    var date = new Date(),
        d = date.getDate(),
        m = date.getMonth(),
        y = date.getFullYear();

    $scope.events = [];
    $scope.tempevents = [];
    $scope.firstCourse = '';
    $scope.selectStartDate = '2016-06-06';
    $scope.courseId = id;
    $scope.stringToColor = stringToColor;
    $scope.getReadableColor = getReadableColor;

    $calendar.getSchedule(id).then(function(result) {
        $scope.course = result.data;
        
        angular.forEach(result.data.content, function(val, index) {
            $scope.events.push(val);
            $scope.tempevents.push(val);
        });
    });

    $scope.changeView = function(view, calendar) {
        $('#calendar').fullCalendar('changeView', view);
    };

    $scope.eventsF = function(start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        callback($scope.events);
        colorizeCalendar();
    };
    $scope.goToClass = function (info){
        
        angular.forEach($scope.events, function(val, index){
            if (val.title === info){
                $('#calendar').fullCalendar('gotoDate', val.start);
            }
        });
        
    };

    $scope.getNextCourseDate = function() {
        $calendar.getSchedule(id).then(function(result) {
            var date = '';
            $scope.course.name = result.data.name;
            angular.forEach(result.data.content, function(val, index) {
                if (moment().format('YYYY-MM-DD') >= val.start && moment().format('YYYY-MM-DD') <= val.end) {
                        date = val.start;
                        $scope.selectStartDate = val.start;
                    }
                if (date === '') {
                    if (moment().format('YYYY-MM-DD') <= val.start) {
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

    $scope.refreshCalendar = function() {
      uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
      uiCalendarConfig.calendars.myCalendar.fullCalendar('addEventSource', $scope.events);
      colorizeCalendar();
    };

    $scope.eventModule = function(opts) {
      $scope.showForm = true;
      $scope.courseData = opts || '';
      $scope.today = new Date();
    };

    $scope.eventModuleHide = function(opts) {
      $scope.showForm = false;
    };

    $scope.eventDelete = function() {
      var o = {
        type: $scope.courseId,
        title: $scope.courseData.title
      };

      $calendar.deleteCourse(o).then(
        function(res) {
          console.log(res);
          $scope.eventModuleHide();
          $scope.refreshCalendar();
        }
      );
    };

    $scope.alertOnEventClick = function( date, jsEvent, view){
      $scope.eventModule(date);
    };

    $scope.getNextCourseDate();
    $scope.uiConfig = {
        calendar: {
            lang: 'sv',
            defaultView: 'month',
            editable: false,
            header: {
                left: 'title',
                center: '',
                right: 'today prev,next',
            },
            eventClick: $scope.alertOnEventClick,
            dayClick: $scope.goToRootScopeDate,
            defaultDate: $scope.selectStartDate
        },
    };


    $scope.eventSources = [$scope.eventsF];




    $scope.goToCourse = function(name){
        $state.go('/student', {id: name});
    };

    $scope.courses = [];
    $calendar.getSchedule()
        .then(function(res) {
            var data = res.data;
            angular.forEach(data, function(val, key) {
                $scope.courses.push({
                    name: key,
                    content: val
                });
            });
        });

}]);
