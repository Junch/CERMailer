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
  
  $scope.data = {selected: ""};
  init();
  
  function init(){
      // http://stackoverflow.com/questions/14577822/ngmodel-doent-pass-data-back-to-parent-scope-in-directive
      $scope.data.reports = [];
      $scope.data.allFlag = false;
  }
    
  $scope.searchbucket = function(){
      init();

      $http.get("/bucket/" + $scope.bucketid)
        .success(function(data){
          $scope.data.reports = data;
          $location.path("/reports");
        }).error(function(error){
          $scope.data.reports.error = error;
        }).finally(function(){
          $scope.bucketid = null;
      });
  }
  
  $scope.searchreport = function(){
      init();

      $http.get("/report/" + $scope.reportid)
        .success(function(data){
          $scope.data.reports = data;
          $location.path("/reports");
        }).error(function(error){
          $scope.data.reports.error = error;
        }).finally(function(){
          $scope.reportid = null;
      });
  }
});

