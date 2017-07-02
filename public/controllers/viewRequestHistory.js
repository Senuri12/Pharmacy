var dreqApp = angular.module('allreqApp', []);
dreqApp.controller('allReqCtrl', ['$scope', '$http', function($scope, $http) {



//show all request history
    $http.get("/api/drug_requests").then(function (response) {
        $scope.allDet = response.data;
        console.log($scope.allDet);
        console.log("inside all");


    })



}]);