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
      controller: 'TemplateCtrl'
    }).
    when('/templates/:id', {
      templateUrl: 'templates/template.html',
      controller: 'TemplateCtrl'
    });
}])

.controller('TemplatesCtrl', function($scope, templateFactory){  
  var init = function() {
      if ($scope.data.templates.length == 0){
          templateFactory.query({},
            function success(data){
                $scope.data.templates = data;
            },
            function error(status){
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
})

.controller('TemplateCtrl', function($scope, $routeParams, $location, templateFactory){
    var tId = $routeParams.id;
  
    if (tId != null) {
      templateFactory.get({id: tId},
        function success(data){
          $scope.data.template = data;
        },
        function error(status){
          $scope.data.error = status;
        });
    }
    else{
      $scope.data.template = null;
    }
  
    $scope.save = function(){
      var id = $scope.data.template.id;
      
      templateFactory.save($scope.data.template,
        function success(data){
          if (id == null) {
            $scope.data.templates.push(data);
          }else{
            for(var i=0; i<$scope.data.templates.length; ++i){
              if ($scope.data.templates[i].id == id){
                $scope.data.templates[i] = data;
              }
            }
          }
        
          $location.path("/templates");
        },
        function error(status){                 
          $scope.data.error = status;
      });
    }
});
