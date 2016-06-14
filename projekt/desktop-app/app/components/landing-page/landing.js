app.controller('landing', ['$state', '$scope', '$calendar', function($state, $scope, $calendar) {

  var paramId;
  $scope.courses = [];
  $scope.selected = [];
  $calendar.getSchedule()
    .then(function(res) {
      var data = res.data;
      angular.forEach(data, function(val, key) {
        $scope.courses.push({name: key, content: val});
      });
      $scope.selected = $scope.courses[0];
    });

  $scope.getParam = function(name) {
    $scope.courses.forEach(function(val) {
      if(val.content.name === name) {
        paramId = val.name;
      }
    });
  };

  $scope.submitStudent = function(name) {
    if(name) {
      $state.go('/student', {id: paramId});
    }
  };

}]);