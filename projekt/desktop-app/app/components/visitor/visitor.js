app.controller('visitorCtrl', ['$scope', '$calendar', function($scope, $calendar) {
      $scope.list = [];
      $scope.text = 'hello';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
     };
     
    $calendar.getSchedule().then(function (result) {
        $scope.utbildningslista = result.data;
        console.log(result.data);
    });
     
}]);