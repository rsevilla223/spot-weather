function locationSettings() {
	"use strict";
	//store checked radio buttons
	switch (sessionStorage.units) {
		case 'fahrenheit':
	    document.getElementById("c1").checked = true;
	    break;
	  case 'celsius':
	    document.getElementById("c2").checked = true;
	    break;
	  case 'kelvin':
	    document.getElementById("c3").checked = true;
	    break;
	  default:
	    document.getElementById("c1").checked = true;
}
	//handle deletion of single note - bind to existing element...
	$('.location-settings').on("click", ".delete-button" , function(e) {
    //delete parent note
    $(this).parent().remove();
	});

	//handle user event for keyboard press
	$(".zipBox").on("keypress", function(e) {
	//check code for keyboard press
	if (e.keyCode === 13) {
    getInput();
    }
  });

	//show zipcode entry box on first click of plus button; on second click, input zipcode into API
	$(".plus-button").on("click", function(e) {
    getInput();
	});

	function getInput() {
    var showme = document.getElementById("zipBox");
		var location_text = $(".zipBox").val();

	if(showme.style.visibility=="visible")
	{

		if(location_text.length!=5 || !isNum(location_text)) {
			alert("Please enter a valid zipcode.");
			return false;
		}
		if($(".zipBox").val()!="")	{createLocation();}
		$(".zipBox").val("");
		showme.style.visibility="hidden";
		return true;
	}
	else
	{
		showme.style.visibility="visible";
	}
};
function isNum(val) {
	return Number (parseFloat(val))==val;
};

	// setting up the logic for making API requests
	var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

	function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
	vars[key] = value;
	});
	return vars;
	};

 //manage input field and new Location output
  function createLocation() {
    //define input field
    var $location_text = $(".zipBox");

//Here's where the API request takes place, appending the zipcode that the user submitted
getJSON("http://api.openweathermap.org/data/2.5/weather?zip="+ $location_text.val() +",us&units=imperial&appid=f7700f7f19f7a49c456299e65bb1edad",
function(err, data) {
  console.log(data);
  if (err != null) {
    alert("Something went wrong: " + err);
  } else {
    //alert("Your query count: " + data.query.count);
  }

  var htmlText = '';

//Here we create HTML elements to be added to the page by appending them to one string and then convert this string to HTML and add it to the body by using the append function in jQuery
  htmlText += "<li class='location-input'><input type='radio' class='radiobtn' name='location' id='"+data.name+"' value='location'>"+" " + "<label for='"+data.name+"'><span></span>"+ data.name +"</label>"+ "<button class='delete-button'>" + "&#10006" + "</button>" + "</li>";

  $('.location-settings').append(htmlText);
});
  };


};

$(document).ready(locationSettings);
