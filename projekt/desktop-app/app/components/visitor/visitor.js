app.controller('visitorCtrl', ['$scope', '$calendar', 'toaster', 'email', function($scope, $calendar, toaster, email) {
    $scope.list = [];
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
      if ($scope.education === '') {
        toaster.info('Utbildning', 'Du måste välja en utbildning du vill ha information om.');
      } else if ($scope.education !== '' && regMail.test($scope.email) === true && text.test($scope.text) === true) {
        // adding toaster-alert on success
        toaster.success($scope.text + '.', 'Ett email skickas snart till ' + $scope.email + '.' + ' Där får du information om ' + $scope.education + ' utbildningen.');
        temp = true;
      }
      return temp;
    };

    $scope.submit = function() {
      if($scope.validateForm() === true) {
        // function for sending email
        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: '"KYH 👥" <kyhschool@gmail.com>', // sender address
            to: $scope.email, // list of receivers
            subject: 'Hej ' + $scope.text + ' ✔', // Subject line
            text: '🐴 Information om ' + $scope.education, // plaintext body
            html: '<b>Hej ' + $scope.text + '🐴</b><br>Här är informationen om ' + $scope.utbildningslista[$scope.education].name + ' utbildningen.<br><br> ' +  $scope.utbildningslista[$scope.education].info + '<br><br><b>Vänliga Hälsningar</b><br><b>KYH</b>'// html body
        };
        console.log($scope.utbildningslista[$scope.education]);
        email
          .sendEmail(mailOptions)
          .then(function (result) {
            console.log(result);
          });
      }
    };

    $calendar.getSchedule().then(function (result) {
        $scope.utbildningslista = result.data;
        console.log(result.data);
    });

}]);
