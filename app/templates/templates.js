'use strict';

angular.module('myApp.templates', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function ($routeProvider) {
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

.controller('TemplatesCtrl', function ($scope, templateFactory) {
  var init = function () {
    if ($scope.data.templates.length == 0){
      templateFactory.query({},
            function success(data) {
              $scope.data.templates = data;
            },
            function error(status) {
              $scope.data.error = status;
            });
    }
  };

  init();

  $scope.delete = function (id) {
    var r = confirm('Do you want to delete the template?');
    if (r == false) {
      return;
    }

    for (var i = 0; i < $scope.data.templates.length; ++i){
      if ($scope.data.templates[i].id == id){
        templateFactory.delete({id: id},
          function success(data) {
            $scope.data.templates.splice(i, 1);
          },
          function error(status) {
            $scope.data.error = status;
          });

        return;
      }
    }
  };

  $scope.preview = function (e, index) {
    if ($scope.index == index) {
      delete $scope.index;
    } else {
      $scope.index = index;
      $('#template-' + index + ' .template-details').html(marked($scope.data.templates[index].content));
    }
    e.preventDefault();
  };
})

.controller('TemplateCtrl', function ($scope, $routeParams, $location, templateFactory) {
  var tId = $routeParams.id;

  if (tId != null) {
    $scope.title = 'Edit Template';

    templateFactory.get({id: tId},
        function success(data) {
          $scope.data.template = data;

        },
        function error(status) {
          $scope.data.error = status;
        });
  }  else {
    $scope.title = 'Add New Template';
    delete $scope.data.template;
  }

  $scope.$watch('data.template.content', function () {
    $('#preview').html(marked($scope.data.template.content));
  });

  $scope.save = function () {
    var id = $scope.data.template.id;

    templateFactory.save($scope.data.template,
        function success(data) {
          if (id == null) {
            $scope.data.templates.push(data);
          }else {
            for (var i = 0; i < $scope.data.templates.length; ++i){
              if ($scope.data.templates[i].id == id){
                $scope.data.templates[i] = data;
              }
            }
          }

          $location.path('/templates');
        },
        function error(status) {
          $scope.data.error = status;
        });
  };
});
