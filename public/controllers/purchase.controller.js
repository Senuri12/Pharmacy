'use strict';
var myApp = angular.module('PurchaseController', []);
myApp.controller('purCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from purchase controller");

    $http.post('/purchases').then(function(response) {

        $scope.purchases = response.data;

    });

    $scope.addPurchase = function() {
        console.log("Added");
        console.log($scope.request);
        $http.post('/purchases', $scope.request).then(function(response){
            console.log(response);
            refresh();
        });
    };

    var refresh = function () {
        $http.get('/purchases').then(function(response) {
            $scope.purchases = response.data;

        });
    }


}]);



