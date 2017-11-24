// google maps object
var map;
// object to draw map
var directionsDisplay = new google.maps.DirectionsRenderer();
// service to draw a route
var directionsService = new google.maps.DirectionsService();

// call back when geocoder service gets the results
function getLocFromGeocode(results, status) {
    // if successful
    if (status == google.maps.GeocoderStatus.OK) {
        // get location from result
        const result = results[0].geometry.location;
        // get the lat and lng
        const lat = result.lat();
        const lng = result.lng();
        const latLng = {
            lat,
            lng
        };
        city = latLng;
        // create default map options
        var mapOptions = {
            zoom: 10,
            center: city
        };
        // cosntruct g map      
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        // draw map.
        directionsDisplay.setMap(map);
    } else {
        console.log("Could not find this location " + status);
    }
};

// function to draw an empty map when trip loction is given
function placeEmptyMap(city) {
    // if city has no data
    if (city === undefined || city == null || city.length <= 0) {
        return;
    }
    // get lat long from given location and draw map with
    // that location as center.
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': city }, getLocFromGeocode);
};


// function to place marker when a brewery is selected.
function placeMarker(map, location, name) {
    // create a marker object using location, name
    var marker = new google.maps.Marker({
        position: location,
        icon: "../img/hop2.png",
        map: map
    });
    // create a infowindow for tooltip
    var infowindow = new google.maps.InfoWindow({
        content: name
    });
    // open tootip
    infowindow.open(map, marker);
    // add click event for marker to display tooltip
    google.maps.event.addListener(marker, 'click', function(event) {
        infowindow.open(map, marker);
    });
};


// function to draw the route on the map on create trip using the brewery list
function calcRoute(breweryList) {
    // if breweryList has items in it
    if (breweryList !== undefined && breweryList != null && breweryList.length > 0) {
        //get 1st brewery as start location
        var start = breweryList[0].loc;
        //get last brewery as end location
        var end = breweryList[breweryList.length - 1].loc;
        // populate an array of waypoints using the other breweries in the list
        var wayPoints = [];
        for (var i = 1; i < breweryList.length - 1; i++) {
            wayPoints.push({ location: breweryList[i].loc, stopover: true });
        }

        // create a direction service request
        var request = {
            origin: start,
            destination: end,
            waypoints: wayPoints,
            optimizeWaypoints: true,
            travelMode: google.maps.TravelMode.DRIVING
        };

        // draw route
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                alconsole.logert("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
            }
        });
    }
};


// add brewery icon to map.
function addBrewery(name, addr, zip, id) {
    // Grabs input
    var bName = name;
    var _addr = addr;
    var _zip = zip;
    var _id = id;
    //var loc = new google.maps.LatLng(lat, lng);



    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': _addr + " " + _zip }, function(results, status) {
        // if successful
        if (status == google.maps.GeocoderStatus.OK) {
            // get location from result
            const result = results[0].geometry.location;
            // get the lat and lng
            const lat = result.lat();
            const lng = result.lng();
            const latLng = {
                lat,
                lng
            };
            // city = latLng;
            // create default map options
            var mapOptions = {
                zoom: 10,
                center: latLng
            };

            // place a marker on the map 
            placeMarker(map, latLng, bName);

            // Creates local "temporary" object for holding brewery data
            var newBrewery = {
                name: bName,
                loc: latLng,
                id: _id
            };

            // add to brewery array
            breweryList.push(newBrewery);

        } else {
            console.log("Could not find this location " + status);
        }

    });




};