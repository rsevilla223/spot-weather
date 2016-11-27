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

getJSON("https://api.spotify.com/v1/search?q=mist&type=track",
function(err,data) {
  console.log(data);
  //var audio = new Audio('https://p.scdn.co/mp3-preview/f9f00efa0d95d2db76f1a95a518f5f0df0520b59');
  //audio.play();

  htmlText = '';

  htmlText += "<div class='spotify_display'>";
  htmlText += '<button onclick="playAudio(audioObject)">Play</button>';
  htmlText += '<button onclick="pauseAudio(audioObject)">Pause</button>';
  for (var i=0; i<data.tracks.items.length; i++){
    htmlText += "<p class='track_info' style='color:white;'>" + data.tracks.items[i].name + ' ' + data.tracks.items[i].artists[0].name + "</p>";
  }
  htmlText += "<p class='track_info'>" + data.tracks.items[0].name + ' ' + data.tracks.items[0].artists[0].name + "</p>";
  htmlText += "</div>";

  $('.spotify_info').append(htmlText);


})

var createAudio = function(audioURL){
  var audio = new Audio(audioURL)
  return audio;
}

var playAudio = function(audioObject){
  audioObject.play();
}

var pauseAudio = function(audioObject){
  audioObject.pause();
}

var audioUrl = 'https://p.scdn.co/mp3-preview/f9f00efa0d95d2db76f1a95a518f5f0df0520b59';
var audioObject = createAudio(audioUrl);
