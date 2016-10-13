// Get the modal
var modalS = document.getElementById('mySignupModal');
var modalL = document.getElementById('myLoginModal');


// Get the button that opens the modal
var btnS = document.getElementById("mySignupBtn");
var btnL = document.getElementById("myLoginBtn");


// Get the <span> element that closes the modal
var spanS = document.getElementById("spanS");
var spanL = document.getElementById("spanL");


// When the user clicks the button, open the modal
btnS.onclick = function() {
    modalS.style.display = "block";
}
btnL.onclick = function() {
    modalL.style.display = "block";
}


// When the user clicks on <span> (x), close the modal
spanS.onclick = function() {
    modalS.style.display = "none";
}
spanL.onclick = function() {
	modalL.style.display = "none";
}
