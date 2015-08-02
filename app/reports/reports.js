'use strict';

angular.module('myApp.reports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', function($scope, $http) {

  $scope.toggleAll = function(){
    $scope.data.reports.forEach(function(item){
      item.select = $scope.data.allFlag;
    });
  };
    
  $scope.checkedCount = function(){
    var checkedArr = $scope.data.reports.filter(function(item){
        return item.select == true;
    });

    return checkedArr.length;
  };
  
  $scope.selected = '';
  $scope.templates = [];
  
  // http://stackoverflow.com/questions/14117653/how-to-cache-an-http-get-service-in-angularjs
  $http.get("/templateNames", { cache: true})
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

