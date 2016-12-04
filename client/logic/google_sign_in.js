function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail());

  sessionStorage.currentUser= profile.getName();
  sessionStorage.user_avatar= profile.getImageUrl();
  console.log(sessionStorage.currentUser);
  console.log(sessionStorage.user_avatar);

}



function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
  sessionStorage.clear();
  //sessionStorage.removeItem(currentUser);
  //sessionStorage.removeItem(user_avatar);
}
