'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.reports',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('AppCtrl', function($scope, $location) {
  
  $scope.search = function(){
      $scope.cur_bucketid = $scope.bucketid;
      $location.path("/reports");
  }
});

