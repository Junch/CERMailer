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
  
  $scope.searchbucket = function(){
      $scope.cur_bucketid = $scope.bucketid;
      $scope.bucketid = null;
      $location.path("/reports");
  }
  
  $scope.searchreport = function(){
      $scope.cur_reportid = $scope.reportid;
      $scope.reportid = null;
      $location.path("/reports");
  }
});

