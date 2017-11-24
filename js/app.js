var breweryList = [];
var tripLoc;

// accordian
function accordion() {
    var acc = document.getElementsByClassName("accordionBtn");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function() {

            //// Grabs data from UI
            var bName = $(this).data("name");
            var addr = $(this).data("address");
            var zip = $(this).data("zip");
            var id = $(this).data("id");
            // addBrewery icon
            addBrewery(bName, addr, zip, id);

            // display info panel
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        }
    }
};
//accordian end

// handler for new location entered by user
$("#locationsubmit").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // clear the breweryList
    breweryList = [];

    // get the location from user
    tripLoc = $("#locationform").val().trim();
    $("#locationform").val("");
    // create regular expression objects for testing search input
    var alpNum = new RegExp(/^[a-z0-9]| +$/i);
    if(alpNum.test(tripLoc)) {
        // and draw a google map of the given location
        placeEmptyMap(tripLoc);

        // get breweries
        breweryAPI.setURL(name = tripLoc);
        breweryAPI.makeCall(accordion);

        accordion();
    } else {
        // invalid search
        $("#brewSidebar").text("invalid search, please try again");
    }
});

//handler for create button to draw the route and create a trip.
$("#createBtn").on("click", function(event) {
    // prevent event bubbling
    event.preventDefault();

    // get the trip name from user
    tripName = $("#tripnameform").val().trim();
    $("#tripnameform").val("");
    // create regular expression objects for testing search input
    var alpNum = new RegExp(/^[a-z0-9]| +$/i);
    var tId;
    if(alpNum.test(tripName)) {
        // add trip to firebase with user name, get tripId
        tId = fb.addTrip(tripName);
    } else {
        // add trip to firebase with generated name, get tripId
        tId = fb.addTrip("trip " + (initCount + 1));
    }

    //draw the route mapping all chosen breweries
    calcRoute(breweryList);

    window.open("trip.html?tripId=" + tId);

});

$(document).on("click", ".tourBtn", function(event) {
    // prevent event bubbling
    //event.preventDefault();

    // get trip id from tourBtn
    var tId = $(this).data("id");
    // console.log($(this));

    // load trip page
    window.open("trip.html?tripId=" + tId);
    
});

// initial map load
$(document).ready(placeEmptyMap("charlotte"));
