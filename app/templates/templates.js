'use strict';

angular.module('myApp.templates', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/templates', {
      templateUrl: 'templates/templates.html',
      controller: 'TemplatesCtrl'
    }).
    when('/templates/add', {
      templateUrl: 'templates/template.html',
      controller: 'TemplatesCtrl'
    });
}])

.controller('TemplatesCtrl', function($scope, templateFactory){
  var init = function() {
      if ($scope.data.templates.length == 0){
          templateFactory.query({},
            function success(data){
                $scope.data.templates = data;
            },
            function error(errorResponse){
                $scope.data.error = status;
            });   
      }   
  };

  init();
  
  $scope.delete = function(id){
    $scope.data.templates.forEach(function(item){
      if (item.id == id){
        alert("Are you sure to delete the template: " + item.name);
        return;
      }
    });
  }
});


