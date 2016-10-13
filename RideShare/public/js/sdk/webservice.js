angular.module("RideApp")

.service("webservice",function($http){
    
   
    /** For signup. this will save the user to database
     * @param: postData an object habing email and password
     */
    
    this.signup = function(userdata, callback, errcallback){
        
       $http({
            method:'POST',
            url:"/api/save",
		    data:userdata
        }).then(callback,errcallback);
        
    };
    
    /** For login. this will perform the login action
     * @param: email and password an object habing email and password
     */
    
    this.login = function(logindata, callback, errcallback){
        
        $http({            
            method:"GET",
            url:"/api/login",
            params:logindata
        }).then(callback,errcallback);
    };
    
    /** For creating a ride. this will perform ride create action
     * 
     */
    
    this.createRide = function(rideData, callback, errcallback){
        
        $http({            
            method:"POST",
            url:"/api/newride",
            data:rideData
        }).then(callback,errcallback);
    };
    
    /** For searching the ride
     * @param: fromAddress, toAddress and rideDate
     */
    
    this.searchRide = function(rideDetails, callback, errcallback){
        
        $http({            
            method:"GET",
            url:"/api/seacrhride",
            params:rideDetails
        }).then(callback,errcallback);
    };
    
    
});