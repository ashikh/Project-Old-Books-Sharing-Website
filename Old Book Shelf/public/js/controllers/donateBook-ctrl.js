angular.module("OldBookShelf")

.controller("donateBookCtrl", function ($scope, webservice,$rootScope) {

    $scope.book = {} || $scope.book;

    $scope.donateBook = function (bookObj) {

        var bookData = {
            bookTitle: bookObj.bookTitle,
            bookAuthor: bookObj.bookAuthor,
            bookGenre: bookObj.bookGenre,
            userId : $rootScope.loggedInUser._id
        };
        webservice.donateBook(bookData, function (response) {

            console.log("successfully submitted book details");
			$scope.isSuccess=true;

        }, function (error) {

            console.log("You have an error");

        });



    }

});