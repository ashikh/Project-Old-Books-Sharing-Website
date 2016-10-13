angular.module("OldBookShelf")

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
     * @param: email and password an object having email and password
     */
    
    this.login = function(logindata, callback, errcallback){
        
        $http({            
            method:"GET",
            url:"/api/login",
            params:logindata
        }).then(callback,errcallback);
    };
    
    /** For Submitting book details. this will submit book details that is to be donated
     * 
     */
    
    this.donateBook = function(bookData, callback, errcallback){
        
        $http({            
            method:"POST",
            url:"/api/newbook",
            data:bookData
        }).then(callback,errcallback);
    };
    
    /** For ordering the book
     * params: bookDetails
     */
    
    this.searchBook = function(bookDetails, callback, errcallback){
        
        $http({            
            method:"GET",
            url:"/api/orderbook",
            params:bookDetails
        }).then(callback,errcallback);
    };
    
    
});