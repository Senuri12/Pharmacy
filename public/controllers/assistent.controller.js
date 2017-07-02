var myApp = angular.module('assistentController', []);
myApp.controller('reqCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    var dispid;
//req drugs from chief
    $http.post('/drugstock').then(function(response) {
        $scope.stopSpam = true;
        $scope.drugstock = response.data;

    });


    $scope.mesg = function () {
        alert("Action Saved.");
    }

    $scope.requst = function (drugId,reqQuantity,checks) {



        var date = moment(new Date()).format('YYYY-MM-DD').toString();
        var ids = moment(new Date()).format('MMhhmmss').toString();

        if(checks){
            $scope.stopSpam = false;
            $http.post('/drugstockA/'+drugId+'/'+reqQuantity+'/'+date+'/'+ids).then(function(response) {
                console.log(response.data.length);
                if(response.data.length==2){
                    alert("You have already requested this medicine.");
                }
            });

        }
        else {
            $http.post('/drugstockA/'+drugId).then(function(response) {

            });
        }

    }

    $scope.Search = function(id){
        $http.post('/drugstock/'+id).then(function(response) {
            $scope.drugstock = response.data;

        });
    }

    //prescription part

    var refrech = function () {
        $http.post('/prescription').then(function(response) {

            $scope.prescription = response.data;

        });


    }
    $http.post('/prescription').then(function(response) {

        $scope.prescription = response.data;

    });

    $http.post('/prescriptionback').then(function(response) {

        $scope.prescriptionback = response.data;

    });

    $scope.SearchPatient = function(id){
        if(id==""){
            $http.post('/prescription').then(function(response) {

                $scope.prescription = response.data;

            });
        }
        else {
            $http.post('/viaPatient/'+id).then(function(response) {
                $scope.prescription = response.data;

            });
        }

    }

    $scope.SearchPrescription2 = function(a){
        console.log(a);
        if(a==""){
            $http.post('/prescription').then(function(response) {

                $scope.prescription = response.data;

            });
        }
        else {
            $http.post('/searchpresciption/'+a).then(function (response) {
                $scope.prescription = response.data;

            });
        }
    }

    $scope.SearchPrescription3 = function(b){
        if(b==""){
            $http.post('/prescriptionback').then(function(response) {

                $scope.prescriptionback = response.data;

            });
        }
        else {
            $http.post('/searchpresciptionA/' +b).then(function (response) {
                $scope.prescriptionback = response.data;

            });
        }
    }

    $scope.loadpres = function(a){
        dispid=a;
        console.log(dispid);
        $http.get('/dispense/'+dispid).then(function(response) {
            console.log(response.data.Drug_name);
            $scope.dispensedata= response.data;

        });
    }

    $scope.dispens = function(a,b,c){
        dispid=a;
        var drugname=b;
        var quantity= c;

        $http.post('/dispensehandle/'+dispid+'/'+drugname+'/'+quantity).then(function(response) {

            $scope.dispensedata= response.data;
            refrech();


        });


        $http.put('/updating/'+drugname+'/'+quantity).then(function (response) {

        })

    }


}]);


