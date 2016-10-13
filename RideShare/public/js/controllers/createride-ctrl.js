angular.module("RideApp")

.controller("createRideCtrl", function ($scope, webservice, NgMap,$rootScope, $location) {

    $scope.ride = {} || $scope.ride;
    $scope.ride.fromAddress = "";
    $scope.ride.toAddress = "";
    $scope.travelMode = "DRIVING";


    $scope.origin = "";
    $scope.destination = "";
    
    $scope.updateMap = function(){
         $scope.origin = $scope.ride.fromAddress.formatted_address;
         $scope.destination = $scope.ride.toAddress.formatted_address;
    };

    $scope.createRide = function (rideObj) {

        var date = new Date(rideObj.rideDate);
        var dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        var time = new Date(rideObj.rideTime);
		var hr=time.getHours();
		if (hr < 10){
			hr='0'+hr;
		}
		var min=time.getMinutes();
		if (min < 10){
			min='0'+min;
		}
        var timeString = hr + ":" + min;

        var rideData = {

            fromAddress: rideObj.fromAddress.formatted_address,
            toAddress: rideObj.toAddress.formatted_address,
            rideDate: dateString,
            rideTime: timeString,
            totalCapacity: rideObj.totalCapacity,
            avlSeats: rideObj.totalCapacity,
            phoneNo: rideObj.phoneNo,
            carDetails: rideObj.carDetails,
			ridePrice:rideObj.ridePrice,
            userId : $rootScope.loggedInUser._id
        };


        webservice.createRide(rideData, function (response) {

            console.log("successfully created ride");
			$scope.isSuccess=true;

        }, function (error) {

            console.log("You have an error");

        });



    }

});