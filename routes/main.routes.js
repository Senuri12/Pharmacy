'use strict';

angular.module('pharmacyApp').config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'index.html',
            controller: 'MainController'
        }).otherwise({
            redirectTo: '/home'
        });

        $locationProvider.html5Mode(true);
    }]);