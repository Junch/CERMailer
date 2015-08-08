'use strict';

angular.module('myApp.templates')

.constant("dataUrl", "/templateNames/:id")

.factory("templateFactory", function($resource, dataUrl){
    return $resource(dataUrl, {id: "@id"});
});
