//function zipcodeErrors () {
//  "use strict";

  //handle user event for keyboard press
	//$(".zipcode").on("keypress", function(e) {
	//check code for keyboard press
//	if (e.keyCode === 13) {
//    checkZip();
//    }
//  });

//  $(".zipcodeSubmit").on("click", function(e) {
  //  checkZip();

//  });

  function validateZip() {
       //define input field
       var location_text = $(".zipcode").val();
       if(location_text.length!=5 || !isNum(location_text)) {
         alert("Please enter a valid zipcode.");
         return false;
       }
       return true;
  };

  function isNum(val) {
    return Number (parseFloat(val))==val;
  };
//};
//$(document).ready(zipcodeErrors);
