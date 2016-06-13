app.controller('student', ['$scope', '$state', '$stateParams', '$calendar', function($scope, $state, $stateParams, $calendar) {
  
  
$scope.events = [{titel: '213', start: moment('2016-06-13')}];
  $calendar.getSchedule('MWD').then(function (result) {
    $scope.course = result.data;
    $scope.events = result.data.content;
    console.log(result.data.content);
  });
  
}]);
