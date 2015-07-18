'use strict';

angular.module('myApp.reports', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/reports', {
    templateUrl: 'reports/reports.html',
    controller: 'ReportsCtrl'
  });
}])

.controller('ReportsCtrl', function($scope) {
  $scope.reports = [
    {id:115807296, bid:27260101, sent:false, defect:47988, email: 'karanth@mahindraaerospace.com', comments: 'abcd', bnotes: '1234', select: false },
    {id:115792788, bid:27260101, sent:false, defect:47988, email: 'studio.rosnati@libero.it', comments: 'efgh', bnotes: '1234', select: false },
    {id:115745129, bid:27260101, sent:false, defect:47988, email: 'sono@mikami.co.jp', comments: 'ijkl', bnotes: '1234', select: false },
  ];

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

