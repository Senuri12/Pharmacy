var app = angular.module('assistentController1', []);
app.controller('drgCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from Add drug");

    var refresh = function () {
        $http.post('/api/drugs').then(function(response) {
            $scope.druginfo = response.data;

        });
    }

    $scope.saveD = function() {
        console.log("ad");
        console.log($scope.drugs);

        $http.post('/api/drugs/', $scope.drugs).then(function(response){
            console.log("post");
            refresh();
            console.log(response);

        })
    }
    /*$scope.readCSV = function() {
        // http get request to read CSV file content
        $http.get('/asserts/csv_file.csv').success($scope.processData);
    };

    $scope.processData = function(allText) {
        // split content based on new line
        var allTextLines = allText.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];

        for ( var i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var tarr = [];
                for ( var j = 0; j < headers.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
            }
        }
        $scope.data = lines;
    };*/
}]);