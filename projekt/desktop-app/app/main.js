'use strict'; 

angular.module('app', []);

angular.controller('TestController', ['$scope', function($scope) {
  $scope.test = 'Alive';
}]);