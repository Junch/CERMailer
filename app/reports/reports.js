'use strict';

angular.module('myApp.reports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', function($scope) {
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
  $scope.templates = [
    {id: 1, name: 'General'},
    {id: 2, name: 'AutoCAD'},
    {id: 3, name: 'Inventor'},
    {id: 4, name: 'Bug 4'}, 
  ];
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

