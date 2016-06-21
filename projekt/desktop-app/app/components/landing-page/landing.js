app.controller('landing', ['$state', '$scope', '$calendar', function($state, $scope, $calendar) {
  
  $scope.login = {
    username: '',
    password: ''
  };

  $scope.error = {
    username: {
      msg: 'Fel användarnamn',
      state: false
    },
    password: {
      msg: 'Fel lösenord',
      state: false
    },
    select: {
      state: false
    }
  };

  var login = [
    {
      username: 'student',
      password: '123',
      role: 'student'
    },
    {
      username: 'lärare',
      password: '123',
      role: 'teacher'
    }
  ];

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

    var index;
    $scope.error.username.state = false;
    $scope.error.password.state = false;
    $scope.error.select.state = false;

    var temp = $scope.login.username.toLowerCase();
    for(var i = 0; i < login.length; i++) {
      if(login[i].username === temp) {
        $scope.error.username.state = false;
        index = i;
        break;
      } else {
        $scope.error.username.state = true;
      }
    }

    if(!$scope.error.username.state) {
      if(login[index].password === $scope.login.password) {
        if(name) {
          localStorage.removeItem("role");
          if(login[index].role === 'teacher') localStorage.setItem("role", "teacher");
          if(login[index].role === 'student') localStorage.setItem("role", "student");
          $state.go('/student', {id: paramId});
        } else {
          $scope.error.select.state = true;
        }
      } else {
        $scope.login.password = $scope.error.password.msg;
        $scope.error.password.state = true;
      }
    } else {
      $scope.login.username = $scope.error.username.msg;
    }
  };

}]);
