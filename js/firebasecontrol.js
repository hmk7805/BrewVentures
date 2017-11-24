// Team Project 1 - BrewVentures
// Jarrett Tolman - firebase.js

// create a variable to reference the database
var database = firebase.database();

// for testing
var initCount;

var fb = {
    // create database reference objects
    databaseRef: database.ref(),
    tripsRef: database.ref("/trips/"),
    // initiate fb object
    start: function start () {
        // listener to get all trips from firebase
        fb.tripsRef.on("value", function(snapshot) {
            // clear div
            $("#previousTrips").empty();
            initCount = snapshot.numChildren();
            for(e in snapshot.val()) {
                // create previous trip elements
                console.log(snapshot.val()[e].name);
                // new button - accordion-title tourBtn
                var accordionBtn = $("<p>", {
                    class: "tourBtn",
                    text: snapshot.val()[e].name,
                    'data-id': e
                });
                // faviconHop image - faviconHop
                var hopImg = $("<img>", {
                    class: "faviconHop",
                    src: "img/hop2.png"
                });
                // append image to accordionBtn
                $(hopImg).prependTo(accordionBtn);

                // div accordion-inner tourExpand
                var innerDiv = $("<div>", {
                    class: "accordion-inner tourExpand",
                    style: "display:none"
                });
                // p tourName
                var tName = $("<p>", {
                    class: "tourName",
                    text: snapshot.val()[e].name
                });
                $(tName).appendTo(innerDiv);
                // p tourCity
                var tCity = $("<p>", {
                    class: "tourCity",
                    text: snapshot.val()[e].location
                });
                $(tCity).appendTo(innerDiv);
                // a tourLink with data-tripId attribute
                var tLink = $("<a>", {
                    class: "tourLink",
                    href: "trip.html?" + e,
                    target: "_blank",
                    text: "Share Your Trip!",
                    'data-id': e
                });
                $(tLink).appendTo(innerDiv);
                // append button to brewSidebar
                $("#previousTrips").append(accordionBtn);
                //$("#previousTrips").append(innerDiv);
            }
        });
    },
    // function to add trip object to database, returns key
    addTrip: function addTrip (tripName) {
        var timeNow = Math.floor(Date.now());
        //console.log('add trip', uid);
        //debugger;
       return fb.tripsRef.push({
            //user: 'test',
            name: tripName,
            location: tripLoc,
            date: timeNow,
            stops: breweryList
        }).key;
    },
    // function to get one trip from database
    getPreviousTrip: function getPreviousTrip (tripId) {
        var tripObj = {};
        database.ref("/trips/" + tripId).once("value").then(function(snapshot) {
            //tripObj.name = snapshot.val().name;
            //console.log(snapshot.val());
            
            // get tourDiv
            var div = document.getElementById('tourDiv');

            // trip title
            var tripTitle = document.createElement('h3');
            var tName = document.createTextNode(snapshot.val().name);
            tripTitle.appendChild(tName);
            div.appendChild(tripTitle);

            // iterate through stops
            snapshot.val().stops.forEach(function(e) {
                console.log(e);
                // brewery name
                var brewDiv = document.createElement('div');
                brewDiv.setAttribute("id", e.id);
                var brewName = document.createTextNode(e.name);
                var brewHeader = document.createElement('h4');
                brewHeader.appendChild(brewName);
                brewDiv.appendChild(brewHeader);
                div.appendChild(brewDiv);
                // api call for additional brewery info
                breweryAPI.makeSingleCall(e);
            });

            // load breweryList
            breweryList = snapshot.val().stops;
            // calculate route and update map
            calcRoute(breweryList);
        });
        return tripObj;
    },
};

fb.start();

// listener for previous trips
$(".previousTrip").on("click", function() {
    // load previous trip into breweryList
    fb.getPreviousTrip($(this).data("tripId"));
    // create trip
    
});

// fb.addTrip returns key
//$('document').ready(fb.getPreviousTrip(fb.addTrip("test trip 23")));
