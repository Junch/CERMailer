'use strict';

angular.module('myApp.templates', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/templates', {
    templateUrl: 'templates/templates.html',
    controller: 'TemplatesCtrl'
  });
}])

.controller('TemplatesCtrl', [function() {

}]);