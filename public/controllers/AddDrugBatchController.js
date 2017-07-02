var AddBatch = angular.module('AddBatchController', []);
AddBatch.controller('ABatchCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

    var content =["tablets"];
    $scope.content = content;
    var contentType=["cards"];
    $scope.contentType =contentType;

    //get drug type and drug name according to drug category
    $scope.loadDet =function () {
        console.log($scope.Batch.dCategoryName);
        $http.post("/api/druglists/" , $scope.Batch.dCategoryName).then(function(response){

            $scope.drlist = response.data;
            console.log("i am ")
            console.log($scope.drlist);
        });

    }

    //get all the drug categories
     $http.post("/druglists").then(function(response){
     $scope.dlist = response.data;

         console.log($scope.dlist);

         // console.log(response);
    // console.log(response);

     });


//method to calculate the quantities
    $scope.calQty =function () {
        console.log( $scope.Batch.Number_of_Cartoons);
        console.log( $scope.Batch.Number_of_Cards_per_Cartoon);
        console.log($scope.Batch.Number_of_Tablets_per_Card);

        $scope.Batch.Quantity =$scope.Batch.Number_of_Cartoons* $scope.Batch.Number_of_Cards_per_Cartoon * $scope.Batch.Number_of_Tablets_per_Card;        console.log($scope.mul1);


    }



//add the drug batch details

    $scope.addingBtch = function () {
        console.log("aaaaaa")

        $scope.BatchDetails ={
            dCategoryName : $scope.Batch.dCategoryName,

            dName :$scope.Batch.dName,
            Batch_Number :$scope.Batch.Batch_Number,
            dType : $scope.Batch.dType,
            Content : $scope.Batch.Content,
            Content_Type :$scope.Batch.Content_Type,
            Number_of_Cartoons : $scope.Batch.Number_of_Cartoons,
            Number_of_Cards_per_Cartoon : $scope.Batch.Number_of_Cards_per_Cartoon,
            Number_of_Tablets_per_Card : $scope.Batch.Number_of_Tablets_per_Card,
            Quantity :$scope.Batch.Quantity,
            Manufacture_Date:$scope.Batch.Manufacture_Date,
            Expire_Date : $scope.Batch.Expire_Date


        }
        console.log($scope.BatchDetails);
        console.log("Batch added");

        $http.post("/api/drug_batches/" , $scope.BatchDetails).then(function(){

            $scope.Batch="";
        });
    }

}]);