app.controller('visitorCtrl', ['$scope', '$calendar', function($scope, $calendar) {
      $scope.list = [];
      $scope.text = 'namn';
      $scope.submit = function() {
        if ($scope.text) {
          $scope.list.push(this.text);
          $scope.text = '';
        }
     };
     $scope.utbild = [];

    $calendar.getSchedule().then(function (result) {
        $scope.utbildningslista = result.data;
        console.log(result.data);
    });
    
}]);