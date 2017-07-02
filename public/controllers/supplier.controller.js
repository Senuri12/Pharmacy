'use strict';
var myApp = angular.module('SupplierController', []);
myApp.controller('supCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from supplier controller");

    $http.post('/suppliers').then(function(response) {

        $scope.suppliers = response.data;

    });

    $scope.addSupplier = function() {
        console.log("Added");
        console.log($scope.request);
        $http.post('/suppliers', $scope.request).then(function(response){
            console.log(response);
            refresh();
        });
    };

    var refresh = function () {
        $http.get('/suppliers').then(function(response) {
            $scope.suppliers = response.data;

        });
    }

    $scope.fillDetails = function ( _id) {
        $http.post('/suppliers' + _id).then(function(response){
            $scope.supplier = response;
            console.log(response);
            refresh();
        });
    }
    
    $scope.remove = function ( _id) {
        console.log("Removed");
        $http.delete('/suppliers' + _id).then(function(response){
            console.log(response);
            refresh();
        });
    }

}]);



