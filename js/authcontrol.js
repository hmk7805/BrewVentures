// Team Project 1 - BrewVentures
// Jarrett Tolman - authcontrol.js

// anonymous authentication
firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  console.log(errorCode, errorMessage);
});

// if authentication was successful
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    console.log(uid);
    // call control function to load previous trips and set listener on search button
    // add test trip after auth
    //addTrip("test trip 10");
  } else {
    // User is signed out.
    // ...
  }
  // ...
});
