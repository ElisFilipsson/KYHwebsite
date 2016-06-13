app.controller('landing', ['$scope', '$calendar', function($scope, $calendar) {
  
  $scope.courses = [];
  $calendar.getSchedule()
    .then(function(res) {
      var data = res.data;
      angular.forEach(data, function(val, key) {
        $scope.courses.push(val);
      });
    });

}]);