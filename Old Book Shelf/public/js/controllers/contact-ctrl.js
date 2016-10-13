//initialize map on contact page
angular.module("OldBookShelf")

.controller("contactCtrl",function($scope,$location){
    
    $scope.mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(12.969484,77.602440),
    mapTypeId: google.maps.MapTypeId.TERRAIN
}

$scope.map = new google.maps.Map(document.getElementById('locationMap'), $scope.mapOptions);
    
});