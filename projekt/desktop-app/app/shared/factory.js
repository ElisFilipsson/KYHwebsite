app.factory('$calendar', ['$http', function($http) {
  return {
    getSchedule: function(education) {
      var ed = education || '';
      return $http.get('http://localhost:4000/educations/' + ed);
    },
    deleteCourse: function(o) {
      return $http.delete('http://localhost:4000/educations/delete/' + o.type + '/' + o.title);
    },
    addCourse: function(id, content) {
      return $http.patch('http://localhost:4000/educations/add/' + id, content);
    },
  };
}]);

app.factory('email', ['$http', function($http) {
  return {
    sendEmail: function(options) {
      return $http.post('http://localhost:4000/email/', options);
    }
  };
}]);
