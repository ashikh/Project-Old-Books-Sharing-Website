// Get the modal
var modalR = document.getElementById('myReviewModal');

// Get the button that opens the modal
var btnR = document.getElementById("myReviewBtn");

// Get the <span> element that closes the modal
var spanR = document.getElementById("spanR");

// When the user clicks the button, open the modal
btnR.onclick = function() {
    modalR.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanR.onclick = function() {
	modalR.style.display = "none";
}
