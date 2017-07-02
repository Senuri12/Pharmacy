var myApp1 = angular.module('DRUGinfo', []);
myApp1.controller('infoctrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from information");
    $http.get('/Drug_Batch').then(function (response) {
        console.log("I got the data I requested");
        $scope.drugbatch = response.data;
    });

    //get all the drug categories
    $http.get("/api/Drug_Batch").success(function (response) {
        $scope.blist = response;
        console.log(response);

        // console.log(response);
        // console.log(response);

    });
    $scope.loadDet1 = function () {
        console.log($scope.Batch1.Drug_Category);
        $http.post("/api/Drug_Batch/", $scope.Batch1.Drug_Category).success(function (response) {
            console.log("i am batch ");
            $scope.drlis = response;
            console.log(" batch ")
            console.log($scope.drlis);
        });

    }

    $scope.deletes = function(x) {

        $http.delete("/delete/"+x)
            .then(function(response) {
                refresh();
            });

    };
    $scope.edit=function (id) {
        console.log(id);
        $http.get('/Drug_Batch/' +id).success(function (response) {
            $scope.drug=response;
        })
    }
    $scope.updates=function () {
        console.log($scope.drug._id);
        if($scope.drug.Drug_Name==""||$scope.drug.Batch_Number==""||$scope.drug.Drug_Name==undefined||$scope.drug.Batch_Number==undefined) {
            alert('fields are empty');
        }
        else{
            $http.put('/update/'+x , $scope.drug).then(function (response) {
                refresh();
            })
        }
    }


}]);

