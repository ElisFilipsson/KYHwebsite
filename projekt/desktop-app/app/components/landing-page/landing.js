app.controller('landing', ['$state', '$scope', '$calendar', function($state, $scope, $calendar) {
  $scope.login = {
    username: '',
    password: ''
  };

  var login = {
    student: {
      username: 'student',
      password: '123'
    },
    teacher: {
      username: 'lärare',
      password: '123'
    }
  }

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

  $scope.submit = function(name) {
    if(name && $scope.login.username !== '' && $scope.login.password !== '') {
      if($scope.login.username !== login.student.username && $scope.login.password !== login.student.password) return false;
      if($scope.login.username !== login.teacher.username && $scope.login.password !== login.teacher.password) return false;
      $scope.login.username = '';
      $scope.login.password = '';
      $state.go('/student', {id: paramId});
    }
  };

}]);