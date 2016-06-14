app.factory('$calendar', ['$http', function($http) {
  return {
    getSchedule: function(education) {
      var ed = education || '';
      return $http.get('http://localhost:4000/educations/' + ed);
    }
  };
}]);

app.factory('email', ['$http', function($http) {
  return {
    sendEmail: function(options) {
      return $http.post('http://localhost:4000/email/', options);
    }
  };
}]);
