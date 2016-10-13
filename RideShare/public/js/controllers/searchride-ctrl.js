angular.module("RideApp")

.controller("searchRideCtrl", function ($scope,webservice) {

    console.log("Your Search controller is here ..");
    $scope.isError = false;
    $scope.isSuccess = false;
    $scope.searchCount = 0;
    $scope.searchResults = [];
    
    
    $scope.searchRide = function(rideObj){
        $scope.isSuccess = false;
        $scope.isError = false;
        
        var date = new Date(rideObj.rideDate);
        var dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        
        var rideDetail = {

            fromAddress: rideObj.fromAddress.formatted_address,
            toAddress: rideObj.toAddress.formatted_address,
			rideDate:dateString
        };
        
        webservice.searchRide(rideDetail,function(response){
            console.log(response);
            $scope.searchResults = response.data.data;
            $scope.searchCount = $scope.searchResults.length;
            $scope.isSuccess = true;
            
        },function(err){
            console.log("Error Occured");
            $scope.isError = true;
        })
    }
	
	 $scope.bookRide = function (item) {
		console.log(item);
		console.log("successfully created ride");
			$scope.isBooked = true;
			$scope.isSuccess=false;
	 }
});