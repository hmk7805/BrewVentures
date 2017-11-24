// Team Project 1 - BrewVentures
// Jarrett Tolman - trip.js

var trip = {
    // get tripId using ->
    // assuming trip.html?tripId=key
    // var urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.getAll('tripId'));

    // get trip from firebase based on tripId
    // fb.getPreviousTrip(tripId);

    // use optimzed route response object to generate map
    // calcRoute(breweryList);

    // foreach brewery in stops/breweryList array
        // ajax call to breweryDB to get description, website, hours, address, etc.
        // makeSingleCall(brewery);
        // populate html template
    urlParams: new URLSearchParams(window.location.search),
    loadPage: function() {
        // get tripId from url
        var params = trip.urlParams.get('tripId');
        // get trip object from firebase
        fb.getPreviousTrip(params);
        //console.log(tripObj);
        // var para = document.createElement('p');
        // var text = document.createTextNode(params.toString());
        // var div = document.getElementById('tourDiv');
        // para.appendChild(text);
        // div.appendChild(para);
    }
};

$(document).ready(trip.loadPage());