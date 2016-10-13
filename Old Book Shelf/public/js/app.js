angular.module("OldBookShelf",['ngRoute'])

.config(function($routeProvider){
   
    $routeProvider.when('/home',{
       templateUrl:'../views/home-view.html' 
        
    })
    .when('/login',{
        
        templateUrl:'../views/login-view.html',
        controller:'loginCtrl'
    })
    .when('/signup',{
        
        templateUrl:'../views/signup-view.html',
        controller:'signUpCtrl'
    })
	.when('/about',{
        
        templateUrl:'../views/about-view.html'
    })
    .when('/working',{
        
        templateUrl:'../views/working-view.html'
    })
    .when('/donatebook',{
        
        templateUrl:'../views/donatebook-view.html',
        controller:'donateBookCtrl'
    })
    .when('/order',{
        
        templateUrl:'../views/orderbook-view.html',
        controller:'orderBookCtrl'
    })
    .when('/hall',{
        templateUrl:'../views/hall-view.html'
    })
    .when('/contact',{
		controller:"contactCtrl",
        templateUrl:'../views/contact-view.html'
    })
	.when('/faq',{
        templateUrl:'../views/faq-view.html'
    })
	.when('/terms',{
        templateUrl:'../views/terms-view.html'
    })
	.when('/privacy',{
        templateUrl:'../views/privacy-view.html'
    })
	.when('/cookie',{
        
        templateUrl:'../views/cookie-view.html'
    })
    .when('/logout',{
        controller:"logoutCtrl",
        template:"<p>Please wait ... Logging out </p>"
    })
    .otherwise({
        redirectTo:'/home',
        templateUrl:'../views/home-view.html'
			   })
    
})

.controller('mainCtrl',function($rootScope,$scope){
    
    // To check if user is authenticated
    $rootScope.isAuthenticated = false;
    $rootScope.loggedInUser = null;
	
});

