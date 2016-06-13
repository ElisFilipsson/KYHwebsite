app.controller('visitorCtrl', ['$scope', '$calendar', 'toaster', function($scope, $calendar, toaster) {
    $scope.list = [];
    $scope.text = 'Förnamn Efternamn';
    $scope.email = 'email@adress.se';
    $scope.showMessage = false; 
    $scope.emailMessage = '';
    $scope.education = 'MWD';

    // func for verifiying email, name and that an education is choosen
    $scope.validateForm = function() {
      var regMail = /.{1,}[@]{1}.{1,}\.{1}.{1,}/;
      var text = /^[a-zA-ZåäöüßÄÖÜ]{3,}([\s]?)([a-zA-ZåäöüßÄÖÜ]{3,})?$/;
      var temp = false;
      // adding toaster-alert on error
      if(regMail.test($scope.email) === false) {
        toaster.error('Email', 'Du har inte skrivit in en giltig emailadress!');
      } 
      if (text.test($scope.text) === false) { 
        toaster.error('Namn', 'Du har inte skrivit in ett giltigt namn!');
      } 
      else if ($scope.education === '') { 
        toaster.info('Utbildning', 'Du måste välja en utbildning du vill ha information om.');
      }  else {
        // adding toaster-alert on success
        toaster.success($scope.text + '.', 'Ett email skickas snart till ' + $scope.email + '.' + ' Där får du information om ' + $scope.education + ' utbildningen.');
        temp = true;
      }
      return temp;
    };
    
    $scope.submit = function() {
      if($scope.validateForm()) {
        // function for sending email here please!
      }
    };
    
    $calendar.getSchedule().then(function (result) {
        $scope.utbildningslista = result.data;
        console.log(result.data);
    });
    
}]);