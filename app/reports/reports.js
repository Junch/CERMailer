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
        {id:115807296, bid:27260101, sent:false, defect:47988, email: 'karanth@mahindraaerospace.com', comments: 'abcd', bnotes: '1234' },
        {id:115792788, bid:27260101, sent:false, defect:47988, email: 'studio.rosnati@libero.it', comments: 'efgh', bnotes: '1234' },
        {id:115745129, bid:27260101, sent:false, defect:47988, email: 'sono@mikami.co.jp', comments: 'ijkl', bnotes: '1234' },
    ];
});
