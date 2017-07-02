
'use strict';
var myApp = angular.module('TransferController', []);
myApp.controller('transCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from transfer controller");

    $http.post('/transfers').then(function(response) {

        $scope.transfers = response.data;

    });

    $scope.addTransfer = function() {
        console.log("Added");
        console.log($scope.request);
        $http.post('/transfers', $scope.request).then(function(response){
            console.log(response);
            refresh();
        });
    };

    var refresh = function () {
        $http.get('/transfers').then(function(response) {
            $scope.transfers = response.data;

        });
    };

}]);



