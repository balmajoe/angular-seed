'use strict';

angular.module('myApp.customers', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
        .when('/customers', {
            templateUrl: 'customers/customers.html',
            controller: 'CustomersCtrl'
        })
		.when('/customers/Action', {
            templateUrl: 'customers/customersAction.html',
            controller: 'CustomersAction'
        })
    
        .when('/customers/Details', {
            templateUrl: 'customers/customersDetails.html',
            controller: 'CustomersDetails'
        })
    
            
}])



//controleur de customers

.controller('CustomersCtrl', ['$rootScope','$scope','$http','customersProvider','$location', function($rootScope,$scope,$http, customersProvider,$location) {
    
    //Initialisation des valeurs 
    
    if($rootScope.Etape !=1)
    {   
        $http.get('customers/customers.json').success(function(data){
            customersProvider.initCustomer(data);
            $scope.customers= customersProvider.returnCustomer();
            $rootScope.Etape=1; console.log($scope.customers);
        });
    }
    if($rootScope.Etape ==1)
    {
        $scope.customers= customersProvider.returnCustomer(); 
        console.log($scope.customers);
    }
   
     //Choix d'action : Modification
        $scope.updcustomer = function (customer){
        $rootScope.New_Customer = customer;
        $rootScope.Action = 1; //si l'action est 0 c'est une insertion et si Action est 1 c'est une Modification
        $location.path('/customers/Action')
    }
        
     //Choix d'action : Ajout
        $scope.addcustomer = function (){
        $rootScope.New_Customer = customersProvider.newcust() ;
        $rootScope.Action = 0; //si l'action est 0 c'est une insertion et si Action est 1 c'est une Modification
        $location.path('/customers/Action')
    }
        
     //Choix d'action : Détails
        $scope.dtlcustomer = function (customer){
        $rootScope.New_Customer = customer ; 
        $location.path('/customers/Details')
    }
	 //Méthode de suppression
     $scope.rmdcustomer = function (customer){
        // console.log(customer);
        $scope.customers = customersProvider.rmd(customer);
       
    }
   
    
 
}])

.controller('CustomersDetails', ['$rootScope','$scope','customersProvider','$location', function($rootScope,$scope, customersProvider, $location) {
    
    $scope.newcustomer = function (){
        // si on a une insertion 
        
        if($rootScope.Action == 0)  
            {
                //console.log($rootScope.New_Customer);
                $rootScope.New_Customer.index = customersProvider.last_index();
                $scope.customers = customersProvider.new($rootScope.New_Customer);
            }
        //dans le cas d'une modification    
        else  $scope.customers = customersProvider.update($rootScope.New_Customer);
        
        console.log($scope.customers);
        $location.path('/customers')
    }
    
}])
