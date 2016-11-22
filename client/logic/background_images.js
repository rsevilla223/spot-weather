//Note: This is a test page!!!
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
          document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
          break;
        case "scattered clouds":
          document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
          break;
        case "broken clouds":
          document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
          break;
        case "overcast clouds":
          document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
          break;
        default:
          document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
          break;
      };
      break;
    case "Clear":
      document.body.style.backgroundImage = "url('../../client/media/images/mist.jpeg')";
      break;
    case "Rain":
      var background_image = "Grab an umbrella! It's rainy today.";
      break;
    case "Snow":
      var background_image = "It's snowing!";
      break;
    case "Atmosphere":
      switch (data.weather[0].description) {
        case "mist":
          var background_image = "It's a misty day.";
          break;
        case "smoke":
          var background_image = "The air is smoky in your area.";
          break;
        case "haze":
          var background_image = "It's hazy out today";
          break;
        case "sand, dust whirls":
          var background_image = "There's a sandstorm in your area.";
          break;
        case "dust":
          var background_image = "Avoid potential dust storms in your area.";
          break;
        case "volcanic ash":
          var background_image = "There is volcanic ash in your area. If you're reading this, you should evacuate your area.";
          break;
        case "squalls":
          var background_image = "It's storming outside.";
          break;
        case "tornado":
          var background_image = "Take cover: tornado-like conditions in your area.";
          break;
        default:
          var background_image = "Check weather forecast in your areas for atmospheric conditions.";
          break;
        }
        break;
      case "Extreme":
        switch (data.weather[0].description) {
          case "tornado":
            var background_image = "Take cover: tornado-like conditions in your area."
            break;
          case "tropical storm":
            var background_image = "Check your local forecast listings about what to do in the event of a tropical storm.";
            break;
          case "hurricane":
            var background_image = "Stay tuned to your local weather and follow their hurricane procedures.";
            break;
          case "cold":
            var background_image = "Bundle up. Extreme cold weather today."
            break;
          case "hot":
            var background_image = "Stay hydrated and pack your sunscreen! Extremely hot weather today."
            break;
          case "windy":
            var background_image = "Watch out. Extreme winds today."
            break;
          case "hail":
            var background_image = "You may want to stay inside until the hail subsides.";
            break;
          default:
            var background_image = "Take proper precautions for extreme weather in your area.";
            break;
        }
        break;
    case "Thunderstorm":
      var background_image = "It's stormy. Be careful outside today.";
    case "Drizzle":
      var background_image = "It's drizzling. You might need a raincoat today.";
    case "Additional":
      switch (data.weather[0].description) {
        case "calm":
          var background_image = "Enjoy the calm weather!"
          break;
        case "light breeze":
          var background_image = "It's a beautifully breezy day."
          break;
        case "gentle breeze":
          var background_image = "Enjoy the gentle breeze day."
          break;
        case "moderate breeze":
          var background_image = "It's a beautifully breezy day."
          break;
        case "fresh breeze":
          var background_image = "It's a great day to catch some fresh air."
          break;
        case "strong breeze":
          var background_image = "It's a blustery day!"
          break;
        case "high wind, near gale":
          var background_image = "Beware of strong winds today."
          break;
        case "gale":
          var background_image = "Beware of gale-force winds."
          break;
        case "severe gale":
          var background_image = "Avoid being outside in strong gale-force winds."
          break;
        case "storm":
          var background_image = "It's stormimg outside."
          break;
        case "violent storm":
          var background_image = "Take cover. There's a violent storm in your area."
          break;
        case "hurricane":
          var background_image = "Stay tuned to your local weather and follow their hurricane procedures."
          break;
        default:
          var background_image = "Haven't set up a sentence for this type of forecast yet.";
          break;
      }
      break;
    default:
      document.body.style.backgroundImage = "url('mist.jpeg')";
  }
});
