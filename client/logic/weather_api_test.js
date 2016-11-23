var getJSON = function(url, callback) {//just setting up the logic for making API requests
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
  }

var zipcode = getUrlVars()["enteredZipcode"];//Pulls the zipcode from the url at the top that was setup by the submit zipcode page
console.log(zipcode);

var callUrl;

var latitude = sessionStorage.latitude;
var longitude = sessionStorage.longitude;

if (latitude && longitude){
  console.log("Using location " + latitude+" "+longitude);
  callUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude;
}
else {
  console.log("Using zipcode");
  callUrl = "http://api.openweathermap.org/data/2.5/weather?zip="+ zipcode;
}

//var delay = 1000;

//setTimeout(function(){

//Here's where the actual API request takes place, notice how I'm appending the zipcode that the user submitted in the previous page to the URL
getJSON(callUrl +"&us&units=imperial&appid=f7700f7f19f7a49c456299e65bb1edad",
function(err, data) {
  console.log(data);
  if (err != null) {
    alert("Something went wrong: " + err);
  } else {
    //alert("Your query count: " + data.query.count);
  }

  if (data.weather[0].main == "Clouds"){//setting up stock sentences for forecasts
    var forecast_sentence = "Kind of dreary today.";
  }
  else {
    var forecast_sentence = "Haven't set up a sentence for this type of forecast yet."
  }

  var htmlText = '';

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var d = new Date();
  var currentDay = days[d.getDay()];

  var datetest = new Date("2016-11-17 09:00:00");
  var today = datetest.getDay();


//Here we basically create HTML elements to be added to the page by appending them
//to one string and then convert this string to HTML and add it to the body by using the append function in jQuery
  htmlText += "<div class='weather_display'>";
  htmlText += "<p class='day'>Today is: "+ currentDay + "</p>";
  htmlText += "<p class='temperature'>Current Temp in " + data.name + ": " + data.main.temp + "</p>";
  htmlText += "<p class='temperature'>Current Forecast in "+ data.name +": " + data.weather[0].main + "</p>";
  htmlText += "<p class='temperature'>" + forecast_sentence + "</p>";
  htmlText += "</div>";

  $('.weather_container').append(htmlText);
});

//get 5 day forecast
var x = callUrl.replace("weather","forecast");

console.log(callUrl.substring(0,39));
console.log(x);

var forecastUrl = callUrl.substring(0,39) + "forecast" + callUrl.substring(46,callUrl.length);
console.log(forecastUrl);




getJSON(forecastUrl+"&us&units=imperial&appid=f7700f7f19f7a49c456299e65bb1edad",
function(err, data) {
  console.log(data);


  var temps = [];//empty array to store final temp objects for each day in
  var largest = 0;
  var temptotal;
  var count;
  //var tempObject = {temp};
  //console.log(data.list.length);
  for(var i=0;i<data.list.length;i++){// Here I loop through the api which presents the data in 5 increments of 3 hours, I then average the temps to get a final
    //average temp which is then pushed to the temps array in an object along with the date that corresponds to it

    if (data.list[i].dt_txt.substring(8,10) > largest || i+1 == data.list.length){
      largest = data.list[i].dt_txt.substring(8,10);
      //console.log("Total temp is " + temptotal/count);
      if (temptotal > 0){
        var tempObject = {temp:temptotal/count, date:data.list[i-1].dt_txt};
        temps.push(tempObject);
      }
      temptotal = 0;
      count = 0;
    }

    temptotal += data.list[i].main.temp;
    count++;

    //console.log("The temp for " + data.list[i].dt_txt + " is " + data.list[i].main.temp);
  }
//This is where the forecast gets outputted to the page
  var htmlText = '';

  htmlText += "<div class='5dayweather_display'>";

  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for(var x=0; x<temps.length; x++){
    var loopDate = new Date(temps[x].date);
    htmlText += "<p class='daytemps'>"+ days[loopDate.getDay()] + ": " + Math.round(temps[x].temp) + "</p>";//The loop creates one of these lines for each day
  }

  htmlText += "</div>";

  $('.weather_container').append(htmlText);

  //console.log(temps);
})

//}, delay);
