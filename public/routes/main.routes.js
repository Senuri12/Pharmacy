angular.module('pharmacyRoute',['ngRoute']).config(function ($routeProvider,$locationProvider) {
    $routeProvider.when('/',{
        templateUrl : '/pages/home.html'
    }).when('/ApprovalRequest',{
        templateUrl : '/pages/DrugRequesting.html',
        controller : 'reqCtrl',
        controllerAs: 'drugreq'
    })
        .when('/ViewReq',{
            templateUrl : '/pages/drugRequests.html',
            controller : 'ReqCtrl',
            controllerAs: 'reaacc'
        })
        .when('/AddBatch',{
            templateUrl : '/pages/addDrugBatch.html',
            controller : 'ABatchCtrl',
            controllerAs: 'addBatch'
        })
        .when('/ViewAllReqHistory',{
            templateUrl : '/pages/viewAllRequests.html',
            controller : 'allReqCtrl',
            controllerAs: 'allreqhis'
        })
        .when('/Prescriptions',{
            templateUrl : '/pages/Patients.html',
            controller : 'reqCtrl',
            controllerAs: 'drugreq'
        }).when('/dispense',{
        templateUrl : '/pages/dispense.html',
        controller : 'reqCtrl',
        controllerAs: 'drugreq'
    }).when('/stocks', {
        templateUrl : '/pages/chief_home.html',
        controller : 'reqCtrl',
        controllerAs: 'drugreq'
    }).when('/suppliers', {
        templateUrl: '/pages/supplier.list.html',
        controller: 'supCtrl',
        controllerAs: 'viewSup'
    }).when('/error', {
        templateUrl: '/pages/404.html'
    }).when('/purchases', {
        templateUrl: '/pages/purchase.list.html',
        controller: 'purCtrl',
        controllerAs: 'viewPur'
    }).when('/transfers', {
        templateUrl: '/pages/transactions.list.html',
        controller: 'transCtrl',
        controllerAs: 'viewTrans'
    })
        .when('/email', {
            templateUrl: '/pages/purchase.email.html'
        }).when('/addDrugs',{
            templateUrl: '/pages/addDrugs.html',
            controller:'drgCtrl',
            controllerAs:'addDrug'
        }).when('/updateDrug',{
            templateUrl: '/pages/updateDrugs.html',
            controller:'appctrl',
            controllerAs:'updateDrug'
        }).when('/drugInfo',{
            templateUrl: '/pages/drugInfo.html',
            controller:'infoctrl',
            controllerAs:'drugInfo'
        });



    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
