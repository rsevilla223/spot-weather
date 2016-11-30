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


var getForecast = function() {
  var forecast = document.getElementById("mainforecast").getAttribute('spotforecast');
  return forecast;
}

var main_forecast = getForecast();

getJSON("https://api.spotify.com/v1/search?q="+main_forecast+"&type=track",
function(err,data) {
  console.log(data);
  //var audio = new Audio('https://p.scdn.co/mp3-preview/f9f00efa0d95d2db76f1a95a518f5f0df0520b59');
  //audio.play();

  htmlText = '';

  htmlText += "<div class='spotify_display'>";
  var tracks = [];
  for (var i=0; i<data.tracks.items.length; i++){
    var track_string = i+'. ' + data.tracks.items[i].name + ' ' + data.tracks.items[i].artists[0].name;
    var track_object = {number:i, artist:data.tracks.items[i].artists[0].name, title:data.tracks.items[i].name,
    preview:data.tracks.items[i].preview_url};
    tracks.push(track_object);

    htmlText += "<li class='track_info' id='" +i+"' style='color:white;' track_url='"+data.tracks.items[i].preview_url+"' artist_name='"+data.tracks.items[i].artists[0].name+"' song_name='"+data.tracks.items[i].name+"' ondblclick='createAndPlay(getTrackUrl("+i+"), getTrackObject("+i+"));' track_number="+i+">" + track_string + "</li>";


  }

  console.log(tracks);

  htmlText += "</div>";

  $('.spotify_info').append(htmlText);


})

var getTrackUrl = function(track_number) {
  var track_url = document.getElementById(""+track_number+"").getAttribute('track_url');
  return track_url;
}

var getTrackObject = function(track_number) {
  var track_object = {artist_name: document.getElementById(""+track_number+"").getAttribute('artist_name'),
                      song_name: document.getElementById(""+track_number+"").getAttribute('song_name')};
  return track_object;
}

var createAndPlay = function(audio_url, track_object){
  $('.audio_player').html('');
  var htmlText = '';
  console.log("running createAndPlay for " + audio_url);

  //var audioObject = createAudio(audio_url);
  htmlText += '<p style="color:white;">Now Playing: '+track_object.artist_name+" "+track_object.song_name+'</p>';
  htmlText += '<audio controls autoplay="true">';
  htmlText += '<source src="'+audio_url+'" type="audio/mp3">';
  htmlText += '</audio>';
  $('.audio_player').append(htmlText);
  //audioObject.play();
}


var createAudio = function(audio_url){
  console.log("creating audio");
  //var audioURL = findTrack(track_number, track_array);
  var audio = new Audio(audio_url);
  return audio;
}

var findTrack = function(track_number, track_array){
  audioURL = track_array[track_number].preview;
  return audioURL;
}

var playAudio = function(audioObject){
  console.log("playing audio preview");
  audioObject.play();
}

var pauseAudio = function(audioObject){
  audioObject.pause();
}

var audioUrl = 'https://p.scdn.co/mp3-preview/f9f00efa0d95d2db76f1a95a518f5f0df0520b59';
var audioObject = createAudio(audioUrl);
