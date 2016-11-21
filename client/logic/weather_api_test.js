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

//Here's where the actual API request takes place, notice how I'm appending the zipcode that the user submitted in the previous page to the URL
getJSON("http://api.openweathermap.org/data/2.5/weather?zip="+ zipcode +",us&units=imperial&appid=f7700f7f19f7a49c456299e65bb1edad",
function(err, data) {
  console.log(data);
  if (err != null) {
    alert("Something went wrong: " + err);
  } else {
    //alert("Your query count: " + data.query.count);
  }

  switch (data.weather[0].main) {
    case "Clouds":
      switch (data.weather[0].description) {
        case "few clouds":
          var forecast_sentence = "A few clouds on the horizon today."
          break;
        case "scattered clouds":
          var forecast_sentence = "Don't let a few scattered crowds turn you away from a beautiful day."
          break;
        case "broken clouds":
          var forecast_sentence = "A great day to search for your dreams amongst the clouds."
          break;
        case "overcast clouds":
          var forecast_sentence = "It's kinda dreary today."
          break;
        default:
          var forecast_sentence = "It's a cloudy day."
          break;
      };
      break;
    case "Clear":
      var forecast_sentence = "It's a beautiful day today!";
      break;
    case "Rain":
      var forecast_sentence = "Grab an umbrella! It's rainy today.";
      break;
    case "Snow":
      var forecast_sentence = "It's snowing!";
      break;
    case "Atmosphere":
      switch (data.weather[0].description) {
        case "mist":
          var forecast_sentence = "It's a misty day.";
          break;
        case "smoke":
          var forecast_sentence = "The air is smoky in your area.";
          break;
        case "haze":
          var forecast_sentence = "It's hazy out today";
          break;
        case "sand, dust whirls":
          var forecast_sentence = "There's a sandstorm in your area.";
          break;
        case "dust":
          var forecast_sentence = "Avoid potential dust storms in your area.";
          break;
        case "volcanic ash":
          var forecast_sentence = "There is volcanic ash in your area. If you're reading this, you should evacuate your area.";
          break;
        case "squalls":
          var forecast_sentence = "It's storming outside.";
          break;
        case "tornado":
          var forecast_sentence = "Take cover: tornado-like conditions in your area.";
          break;
        default:
          var forecast_sentence = "Check weather forecast in your areas for atmospheric conditions.";
          break;
        }
        break;
      case "Extreme":
        switch (data.weather[0].description) {
          case "tornado":
            var forecast_sentence = "Take cover: tornado-like conditions in your area."
            break;
          case "tropical storm":
            var forecast_sentence = "Check your local forecast listings about what to do in the event of a tropical storm.";
            break;
          case "hurricane":
            var forecast_sentence = "Stay tuned to your local weather and follow their hurricane procedures.";
            break;
          case "cold":
            var forecast_sentence = "Bundle up. Extreme cold weather today."
            break;
          case "hot":
            var forecast_sentence = "Stay hydrated and pack your sunscreen! Extremely hot weather today."
            break;
          case "windy":
            var forecast_sentence = "Watch out. Extreme winds today."
            break;
          case "hail":
            var forecast_sentence = "You may want to stay inside until the hail subsides.";
            break;
          default:
            var forecast_sentence = "Take proper precautions for extreme weather in your area.";
            break;
        }
        break;
    case "Thunderstorm":
      var forecast_sentence = "It's stormy. Be careful outside today.";
    case "Drizzle":
      var forecast_sentence = "It's drizzling. You might need a raincoat today.";
    case "Additional":
      switch (data.weather[0].description) {
        case "calm":
          var forecast_sentence = "Enjoy the calm weather!"
          break;
        case "light breeze":
          var forecast_sentence = "It's a beautifully breezy day."
          break;
        case "gentle breeze":
          var forecast_sentence = "Enjoy the gentle breeze day."
          break;
        case "moderate breeze":
          var forecast_sentence = "It's a beautifully breezy day."
          break;
        case "fresh breeze":
          var forecast_sentence = "It's a great day to catch some fresh air."
          break;
        case "strong breeze":
          var forecast_sentence = "It's a blustery day!"
          break;
        case "high wind, near gale":
          var forecast_sentence = "Beware of strong winds today."
          break;
        case "gale":
          var forecast_sentence = "Beware of gale-force winds."
          break;
        case "severe gale":
          var forecast_sentence = "Avoid being outside in strong gale-force winds."
          break;
        case "storm":
          var forecast_sentence = "It's stormimg outside."
          break;
        case "violent storm":
          var forecast_sentence = "Take cover. There's a violent storm in your area."
          break;
        case "hurricane":
          var forecast_sentence = "Stay tuned to your local weather and follow their hurricane procedures."
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

//Here we basically create HTML elements to be added to the page by appending them
//to one string and then convert this string to HTML and add it to the body by using the append function in jQuery
  htmlText += "<div class='weather_display'>";
  htmlText += "<p class='temperature'>Current Temp in " + data.name + ": " + data.main.temp + "</p>";
  htmlText += "<p class='temperature'>Current Forecast in "+ data.name +": " + data.weather[0].main + "</p>";
  htmlText += "<p class='temperature'>" + forecast_sentence + "</p>";
  htmlText += "</div>";

  $('.weather_container').append(htmlText);
});
