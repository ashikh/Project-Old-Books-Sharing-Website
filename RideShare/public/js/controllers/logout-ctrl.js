angular.module("RideApp")

.controller("logoutCtrl",function($rootScope,$location){
    
    console.log("Logout Controller ..")
    $rootScope.isAuthenticated = false;
    $location.url('/login');
    
});