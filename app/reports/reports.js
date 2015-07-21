'use strict';

angular.module('myApp.reports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', function($scope, $http) {
  $scope.allFlag = false;

  $scope.toggleAll = function(){
    $scope.reports.forEach(function(item){
      item.select = $scope.allFlag;
    });
  };
    
  $scope.checkedCount = function(){
    var checkedArr = $scope.reports.filter(function(item){
        return item.select == true;
    });

    return checkedArr.length;
  };
  
  $scope.selected = '';
  $scope.templates = [];
  
  $http.get("/templates")
    .success(function(data){
      $scope.templates = data;
    })
    .error(function(error){
      $scope.templates.error = error;
    });
})

.filter("checked", function(){
  return function(items) {
    var returnArr = [];
    angular.forEach(items, function(item){
      if (item.select == true){
        returnArr.push(item);
      }
    });
    return returnArr;
  }
});

