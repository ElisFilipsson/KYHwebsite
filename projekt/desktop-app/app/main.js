'use strict'; 

angular.module('app', []);

angular.module('app').controller('TestController', ['$scope', function($scope) {
  $scope.test = 'Alive';
}]);