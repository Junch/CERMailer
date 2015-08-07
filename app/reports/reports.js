'use strict';

angular.module('myApp.reports', ['ngRoute', 'myApp.templates'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', function($scope, templateFactory) {

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
  
  if ($scope.data.templates.length == 0){
      templateFactory.query({},
        function success(data){
            $scope.data.templates = data;
        },
        function error(status){
            $scope.data.error = status;
        });
  }  
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

