'use strict';

angular.module('myApp.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TemplatesCtrl'
  });
}])

.controller('TemplatesCtrl', function($scope){
  $scope.data.templates = [
      {  id: 1,
         name: "General",
         author: "Jun Chen",
         note: "A template for all products",
         email: "jun.chen@autodesk.com"
      },
      {  id: 2,
         name: "AutoCAD",
         author: "Tom Cat",
         note: "A template for AutoCAD",
         email: "tom.cat@autodesk.com"
      },
      {  id: 3,
         name: "Bug 64",
         author: "Jun Chen",
         note: "A template specified for the TFS bug 64",
         email: "jun.chen@autodesk.com"
      }
    ];
  
  $scope.delete = function(id){
    $scope.data.templates.forEach(function(item){
      if (item.id == id){
        alert("Are you sure to delete the template: " + item.name);
        return;
      }
    });
  }
  
});