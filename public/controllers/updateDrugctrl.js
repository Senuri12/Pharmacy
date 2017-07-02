var myApp2 = angular.module('updateDrugs', []);
myApp2.controller('appctrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from update controller");
    $http.get('/druglist').then(function (response) {
        console.log("I got the data I requested");
        $scope.druglist = response.data;
    });


    //get all the drug categories
    $http.post("/druglists").then(function(response){
        $scope.dlist = response.data;
        console.log(response);

        // console.log(response);
        // console.log(response);

    });
    $scope.loadDet =function () {
        console.log($scope.Batch.dCategoryName);
        $http.post("/api/druglists/" , $scope.Batch.dCategoryName).then(function(response){
            console.log("i am nm ");
            $scope.drlist = response.data;
            console.log("i am ")
            console.log($scope.drlist);
        });

    }
    $scope.getTime =function () {
        console.log($scope.Batch.dName);
        $http.post("/api/druglists/" , $scope.Batch.dName).success(function(response){
            console.log("i am abc ");
            $scope.drugl = response;
            //console.log(drug1);
            console.log($scope.drugl);
        });

    }

    $scope.updates=function () {
        console.log($scope.drug._id);
        if($scope.drug.dUnit==""||$scope.drug.dPrice==""||$scope.drug.dStatusOrder==""||$scope.drug.dStatusDanger=="") {
            alert('fields are empty');
        }
        else{
            $http.put('/update/'+x , $scope.drug).then(function (response) {
                refresh();
            })
        }
    }

}]);