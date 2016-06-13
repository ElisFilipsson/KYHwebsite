app.controller('visitorCtrl', ['$scope', '$calendar', function($scope, $calendar) {
    $scope.list = [];
    $scope.text = 'Förnamn Efternamn';
    $scope.email = 'email@adress.se';
    $scope.showMessage = false; 
    $scope.emailMessage = '';
    $scope.education = 'MWD';
    
    $scope.hideMessage = function(){
      $scope.showMessage = false;
    };
    
    // func for verifiying email and name and that an education is choosen
    $scope.validateForm = function() {
      //$scope.email;
      //$scope.text;
      //$scope.education;
      $scope.showMessage = true; 
      $scope.emailMessage = $scope.text + '. Ditt meddelande har blivit skickat till ' + $scope.email + '.' + ' Du får snart information om ' + $scope.education + ' utbildningen.' ;
  };
    
    $scope.submit = function() {
      // function for sending email here please!
      $scope.validateForm();
    };
    
    $calendar.getSchedule().then(function (result) {
        $scope.utbildningslista = result.data;
        console.log(result.data);
    });
    
}]);