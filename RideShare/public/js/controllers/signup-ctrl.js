angular.module("RideApp")

.controller("signUpCtrl",function($scope,webservice,$location){
    
    $scope.isError = false;
    
    $scope.doSignUp = function(user){
        
        $scope.isError = false;
        
        if($scope.checkEmail(user.email) && $scope.checkPassword(user.password,user.confirmpassword)){
            
            var userData = {
                email:user.email,
                password:user.password
            }
            webservice.signup(userData,function(response){
                console.log(response);
                $location.url("/login");
            },function(err){
                 console.log(err);
                 $scope.isError = false;
            });
            
            
        }else{
            $scope.isError = true;
        }
    };
    
    $scope.checkEmail = function(emailId){
        
        if(emailId && emailId.length > 10)
            return true;
        else
            return false;
    };
    
    $scope.checkPassword = function(pass,confPass){
        
        if(pass.length > 6 && pass === confPass)
            return true;
        else
            return false;
    }
    
});
//
//1. validate the email_id
//2. if paswword > 6 characters
//3. if password equals confirm password