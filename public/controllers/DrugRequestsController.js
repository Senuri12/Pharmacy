var dreqApp = angular.module('dreqApp', []);
dreqApp.controller('ReqCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.refresh= refresh;
    function refresh() {
        //get all drug requests
        $http.get("/api/drug_requests").then(function (response) {

            $scope.Drurequest = response.data;
            console.log($scope.Drurequest);
        });
    }
        refresh();

//get the details and updaate about drug requests

        $scope.drugRequests = [];

    $scope.toggleSelection = function toggleSelection(request) {

        var idx = $scope.drugRequests.indexOf(request);

        console.log("index" +idx);

        // Is currently selected
        if (idx > -1) {
            $scope.drugRequests.splice(idx, 1);
        }

        // Is newly selected
        else {
            $scope.drugRequests.push(request);
        }

    };
//when the button is clicked values are sent and updated
    $scope.Approval =  function () {

        console.log($scope.drugRequests);

        $http.put("/drug_requests/",$scope.drugRequests).then(function (response) {

            //$scope.Drurequest = response;
            refresh();
        });

        $http.put("/drug_stock/",$scope.drugRequests).then(function (response) {


        });
    }
//show all request history
    $http.post("/api/drug_requests").then(function (response) {
        $scope.allDet = response.data;
        console.log($scope.allDet);
        console.log("inside all");

    })

}]);