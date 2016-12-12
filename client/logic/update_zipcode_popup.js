// Get the body
//var body = docu
// Get the popup
var popup = document.getElementById('zipcodePopup');

// Get the button that opens the popup
var updateZip = document.getElementById("updateZip");

// Get the <span> element that closes the popup
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the popup
updateZip.onclick = function() {
    popup.style.display = "block";
    document.body.style.overflow = "hidden";
}

// When the user clicks on <span> (x), close the popup
span.onclick = function() {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}
