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
  console.log("Using location " + latitude +" "+ longitude);
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

  switch (data.weather[0].main) {
    case "Haze":
      var forecast_sentence = "It's hazy out today";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/haze.jpg')";
      break;
    case "Clouds":
      switch (data.weather[0].description) {
        case "few clouds":
          var forecast_sentence = "A few clouds on the horizon today."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/few_clouds.jpeg')";
          break;
        case "scattered clouds":
          var forecast_sentence = "Don't let a few scattered crowds turn you away from a beautiful day."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/scattered_clouds.jpeg')";
          break;
        case "broken clouds":
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/broken_clouds.jpeg')";
          var forecast_sentence = "A great day to search for your dreams amongst the clouds."
          break;
        case "overcast clouds":
          var forecast_sentence = "It's kinda dreary today."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/overcast_clouds.jpeg')";
          break;
        default:
          var forecast_sentence = "It's a cloudy day."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/broken_clouds.jpeg')";
          break;
      };
      break;
    case "Smoke":
      var forecast_sentence = "The air is smoky in your area.";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/smoke.jpg')";
      break;
    case "Clear":
      var forecast_sentence = "It's a beautiful day!";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/clear.jpg')";
      break;
    case "Rain":
      var forecast_sentence = "Grab an umbrella! It's rainy today.";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/rain.jpeg')";
      break;
    case "Snow":
      var forecast_sentence = "It's snowing!";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/snow.jpeg')";
      break;
    case "Atmosphere":
      switch (data.weather[0].description) {
        case "mist":
          var forecast_sentence = "It's a misty day.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/mist.jpeg')";
          break;
        case "smoke":
          var forecast_sentence = "The air is smoky in your area.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/smoke.jpg')";
          break;
        case "haze":
          var forecast_sentence = "It's hazy out today";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/haze.jpg')";
          break;
        case "sand, dust whirls":
          var forecast_sentence = "There's a sandstorm in your area.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/sand.jpeg')";
          break;
        case "dust":
          var forecast_sentence = "Avoid potential dust storms in your area.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/sand.jpeg')";
          break;
        case "volcanic ash":
          var forecast_sentence = "There is volcanic ash in your area. If you're reading this, you should evacuate your area.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/volcano.jpeg')";
          break;
        case "squalls":
          var forecast_sentence = "It's storming outside.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/squall.jpeg')";
          break;
        case "tornado":
          var forecast_sentence = "Take cover: tornado-like conditions in your area.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/tornado.jpg')";
          break;
        default:
          var forecast_sentence = "Check weather forecast in your areas for atmospheric conditions.";
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/atmosphere.jpeg')";
          break;
        }
        break;
      case "Extreme":
        switch (data.weather[0].description) {
          case "tornado":
            var forecast_sentence = "Take cover: tornado-like conditions in your area."
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/tornado.jpg')";
            break;
          case "tropical storm":
            var forecast_sentence = "Check your local forecast listings about what to do in the event of a tropical storm.";
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/tropical_storm.jpg')";
            break;
          case "hurricane":
            var forecast_sentence = "Stay tuned to your local weather and follow their hurricane procedures.";
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/hurricane.jpg')";
            break;
          case "cold":
            var forecast_sentence = "Bundle up. Extreme cold weather today."
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/cold.jpeg')";
            break;
          case "hot":
            var forecast_sentence = "Stay hydrated and pack your sunscreen! Extremely hot weather today."
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/hot.jpeg')";
            break;
          case "windy":
            var forecast_sentence = "Watch out. Extreme winds today."
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/wind.jpg')";
            break;
          case "hail":
            var forecast_sentence = "You may want to stay inside until the hail subsides.";
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/hail.jpg')";
            break;
          default:
            var forecast_sentence = "Take proper precautions for extreme weather in your area.";
            document.getElementById("center_info").style.backgroundImage = "url('../../media/images/extreme.jpeg')";
            break;
        }
        break;
    case "Thunderstorm":
      var forecast_sentence = "It's stormy. Be careful outside today.";
      document.getElementById("center_info").style.backgroundImage = "url('../../media/images/thunderstorm.jpeg')";
    case "Drizzle":
      var forecast_sentence = "It's drizzling. You might need a raincoat today.";
document.getElementById("center_info").style.backgroundImage = "url('../../media/images/drizzle.jpeg')";
    case "Additional":
      switch (data.weather[0].description) {
        case "calm":
          var forecast_sentence = "Enjoy the calm weather!"
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/calm.jpg')";
          break;
        case "light breeze":
          var forecast_sentence = "It's a beautifully breezy day."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/light_breeze.jpg')";
          break;
        case "gentle breeze":
          var forecast_sentence = "Enjoy the gentle breeze day."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/gentle_breeze.jpg')";
          break;
        case "moderate breeze":
          var forecast_sentence = "It's a beautifully breezy day."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/moderate_breeze.jpg')";
          break;
        case "fresh breeze":
          var forecast_sentence = "It's a great day to catch some fresh air."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/fresh_breeze.jpeg')";
          break;
        case "strong breeze":
          var forecast_sentence = "It's a blustery day!"
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/strong_breeze.jpg')";
          break;
        case "high wind, near gale":
          var forecast_sentence = "Beware of strong winds today."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/high_wind.jpg')";
          break;
        case "gale":
          var forecast_sentence = "Beware of gale-force winds."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/gale.jpeg')";
          break;
        case "severe gale":
          var forecast_sentence = "Avoid being outside in strong gale-force winds."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/strong_gale.jpg')";
          break;
        case "storm":
          var forecast_sentence = "It's stormimg outside."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/storm.jpg')";
          break;
        case "violent storm":
          var forecast_sentence = "Take cover. There's a violent storm in your area."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/violent_storm.jpeg')";
          break;
        case "hurricane":
          var forecast_sentence = "Stay tuned to your local weather and follow their hurricane procedures."
          document.getElementById("center_info").style.backgroundImage = "url('../../media/images/hurricane.jpg')";
          break;
        default:
          var forecast_sentence = "Haven't set up a sentence for this type of forecast yet.";
          break;
      }
      break;
    default:
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
  htmlText += "<p class='temperature'>Current temperature in " + data.name + ": " + data.main.temp +"&#176;"+"F"+ "</p>";
  htmlText += "<p class='temperature'>Current forecast in "+ data.name +": " + data.weather[0].main + "</p>";
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

  htmlText += "<table>";
  htmlText += "<tr>"
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  for(var x=0; x<temps.length; x++){
    var loopDate = new Date(temps[x].date);
    htmlText += "<th class='daytemps'>"+ days[loopDate.getDay()] + ": " + Math.round(temps[x].temp) + "</th>";//The loop creates one of these lines for each day
  }
  htmlText += "</tr><tr>";
  for(var x=0; x<temps.length; x++){
    var loopDate = new Date(temps[x].date);
    htmlText += "<td>" + Math.round(temps[x].temp) +"&#176;"+"F"+ "</td>";
  }
  htmlText += "</tr>"


  htmlText += "</table>";

  $('.dayweather_display').append(htmlText);


  //console.log(temps);
})

//}, delay);
