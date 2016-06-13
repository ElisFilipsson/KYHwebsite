app.controller('student', ['$scope', '$state', '$stateParams', '$calendar', function($scope, $state, $stateParams, $calendar) {

  $calendar.getSchedule().then(function (result) {
    $scope.course = result.data;
  });
}]);
