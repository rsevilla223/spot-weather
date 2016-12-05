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

var weatherPromise;

function getSpotifyTracks() {
  weatherPromise = getJSON("http://api.openweathermap.org/data/2.5/weather?zip=60056&us&units=imperial&appid=f7700f7f19f7a49c456299e65bb1edad");

  return weatherPromise;
}

var  x= getSpotifyTracks();
console.log(x);
