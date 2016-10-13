angular.module("OldBookShelf")

.controller("orderBookCtrl", function ($scope,webservice) {

    console.log("Your Search controller is here ..");
    $scope.isError = false;
    $scope.isSuccess = false;
    $scope.searchCount = 0;
    $scope.searchResults = [];
    
    
    $scope.searchBook = function(bookObj){
        $scope.isSuccess = false;
        $scope.isError = false;
        
        var bookDetail = {};
        
        webservice.searchBook(bookDetail,function(response){
            console.log(response);
            $scope.searchResults = response.data.data;
            $scope.searchCount = $scope.searchResults.length;
            $scope.isSuccess = true;
            
        },function(err){
            console.log("Error Occured");
            $scope.isError = true;
        })
    }
	
	 $scope.orderBook = function (item) {
		console.log(item);
		console.log("successfully ordered the book");
			$scope.isOrdered = true;
			$scope.isSuccess=false;
	 }
});