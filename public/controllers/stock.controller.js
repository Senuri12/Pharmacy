'use strict';
var myApp = angular.module('StockController', []);
myApp.controller('stockCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from stock controller");

    $http.post('/stocks').then(function(response) {

        $scope.stocks = response.data;
    });

}]);

