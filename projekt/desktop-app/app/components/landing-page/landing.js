app.controller('landing', ['$scope', '$calendar', function($scope, $calendar) {
  $scope.paramId;
  $scope.courses = [];
  $scope.selected = [];
  $calendar.getSchedule()
    .then(function(res) {
      var data = res.data;
      $scope.courses.push({name: 'none', content: {name: 'Välj utbildning'}});
      angular.forEach(data, function(val, key) {
        $scope.courses.push({name: key, content: val});
      });

      $scope.selected = $scope.courses[0];
    });

  $scope.getParam = function(name) {
    $scope.courses.forEach(function(val) {
      if(val.content.name === name) {
        $scope.paramId = val.name;
      }
    });
  };

}]);