'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'mgcrea.ngStrap',
  'myApp.view1',
  'myApp.templates',
  'myApp.reports',
  'myApp.version'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('AppCtrl', function($scope, $location, $http) {
  
  $scope.reports=[];
  
  $scope.searchbucket = function(){
      $scope.reports = [];

      $http.get("/bucket/" + $scope.bucketid)
        .success(function(data){
          $scope.reports = data;
          $location.path("/reports");
        }).error(function(error){
          $scope.reports.error = error;
        }).finally(function(){
          $scope.bucketid = null;
      });
  }
  
  $scope.searchreport = function(){
      $scope.reports = [];

      $http.get("/report/" + $scope.reportid)
        .success(function(data){
          $scope.reports = data;
          $location.path("/reports");
        }).error(function(error){
          $scope.reports.error = error;
        }).finally(function(){
          $scope.reportid = null;
      });
  }
});

