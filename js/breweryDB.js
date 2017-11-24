// Team Project 1 - BrewVentures
// Jarrett Tolman - breweryDB.js

var breweryAPI = {
    // *** api variables ***
    url: "https://secret-spire-74760.herokuapp.com/php/breweryDbService.php",
    queryURL: "",
    name: "charlotte",
    type: "micro,brewpub",
    order: "postalCode",
    endpoint: "locations",
    // *** api functions ***
    setURL: function setURL(name = breweryAPI.name,
                            type = breweryAPI.type,
                            order = breweryAPI.order,
                            endpoint = breweryAPI.endpoint) {
        // create regular expression objects for testing search input
        var numReg = new RegExp('^[0-9]+$');
        var alpReg = new RegExp('^[a-zA-z]| +$');
        // try test for zip then city, if fail, log error
        console.log('name ' + name);
        try {
            if(numReg.test(name)) {
                breweryAPI.queryURL = breweryAPI.url + "?" + $.param({
                    'postalCode': name,
                    'locationType': type,
                    'order': order,
                    'endpoint': endpoint,
                    'isClosed': 'N'
                });
            } else if(alpReg.test(name)) {
                breweryAPI.queryURL = breweryAPI.url + "?" + $.param({
                    'locality': name,
                    'locationType': type,
                    'order': order,
                    'endpoint': endpoint,
                    'isClosed': 'N'
                });
            } else {
                breweryAPI.queryURL = "";
            }
        }
        catch (e) {
            console.log(e);
        }
    },
    // reset queryURL
    resetURL: function resetURL() {
        breweryAPI.queryURL = "";
    },
    // make button and add to sidebar
    makeAccordionBtn: function makeAccordionBtn(e) {
        // create variables for info items
        var name = e["brewery"]["name"];
        var address = e["streetAddress"];
        var zip = e["postalCode"];
        console.log(e);
        var id = e["id"];
        // new button - accordionBtn brewBtn
        var accordianBtn = $("<button>", {
            class: "accordionBtn brewBtn",
            "data-address": address,
            "data-zip": zip,
            "data-name": name,
            "data-id": id
        });
        // faviconHop image - faviconHop
        var hopImg = $("<img>", {
            class: "faviconHop",
            src: "../img/hop2.png"
        });
        // append image to accordianBtn
        $(hopImg).appendTo(accordianBtn);
        // h6 - brewName
        var breweryName = $("<h6>", {
            class: "brewName",
            text: name
        });
        // append name to accordianBtn
        $(breweryName).appendTo(accordianBtn);
        // // add image - addBtn (data-lat, data-long, data-name)
        // var addBtnImage = $("<img>", {
        //     class: "addBtn",
        //     src: "../img/plus-img.png"
        // });
        // // append image to accordianBtn
        // $(addBtnImage).appendTo(accordianBtn);
        // append button to brewSidebar
        $("#brewSidebar").append(accordianBtn);
    },
    // create div, add info, append to sidebar
    makeInfoDiv: function makeInfoDiv(e) {
        //console.log(e["isClosed"], e["brewery"]["description"]);
        // e["locationTypeDisplay"]
        // create variables for brewery info items
        var address = e["streetAddress"];
        var hours = e["hoursOfOperation"];
        var website = e["brewery"]["website"];
        // new div - panel brewInfoDiv
        var panelDiv = $("<div>", {
            class: "panel brewInfoDiv"
        });
        // brewery image - brewLogo
        try {
            var image = e["brewery"]["images"]["squareMedium"];
            var brewImg = $("<img>", {
                class: "brewLogo",
                src: image
            });
            // append image to div
            $(brewImg).appendTo(panelDiv);
        }
        catch (e) {
            console.log("image does not exist");
        }
        // p - brewAddress
        var address = $("<p>", {
            class: "brewAddress",
            text: address
        });
        // append address to div
        $(address).appendTo(panelDiv);
        // p - brewHours
        var brewHours = $("<p>", {
            class: "brewHours",
            text: hours
        });
        // append hours to div
        $(brewHours).appendTo(panelDiv);
        // a - brewUrl
        var brewUrl = $("<a>", {
            class: "brewUrl",
            href: website,
            text: website
        });
        // append url to div
        $(brewUrl).appendTo(panelDiv);
        // append to brewSidebar
        $("#brewSidebar").append(panelDiv);
    },
    // make ajax call to api service
    makeCall: function makeCall(callback) {
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // empty sidebar
            $("#brewSidebar").empty();
            //console.log(result.data);
            // iterate results
            try {
                result.data.forEach(function(e) {
                    try {
                        // if location is not closed permanently and has an address
                        //console.log(e["isClosed"], e["streetAddress"].length);
                        if(e["isClosed"] === "N" && e["streetAddress"].length > 0) {
                            // call functions to build sidebar
                            breweryAPI.makeAccordionBtn(e);
                            breweryAPI.makeInfoDiv(e);
                        }
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                });
            } catch (e) {
                $("#brewSidebar").text("no results found");
                console.log(e.message);
            }
            callback();
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    },
    // make ajax call to api service for info on single location id
    makeSingleCall: function makeSingleCall(brewery) {
        // create queryURL
        //breweryAPI.queryURL = breweryAPI.url + "/location/" + brewery.id;
        console.log(brewery.id);
        breweryAPI.queryURL = breweryAPI.url + "?" + $.param({
                    'ids': brewery.id,
                    // 'locationType': breweryAPI.type,
                    // 'order': breweryAPI.order,
                    'endpoint': "locations"
                    // 'isClosed': 'N'
                });
        // make ajax call
        $.ajax({
            url: breweryAPI.queryURL,
            method: "GET",
        // when complete
        }).done(function(result){
            // update brewery with results
            console.log(result);
            // get tourDiv
            var div = document.getElementById(brewery.id);
            // brewery name
            if(result.data[0].brewery.description != undefined) {
                var brewDescription = document.createTextNode(result.data[0].brewery.description);
                var brewDescPara = document.createElement('p');
                brewDescPara.appendChild(brewDescription);
                div.appendChild(brewDescPara);
            }
            if(result.data[0].website != undefined) {
                var brewLink = document.createElement('a');
                brewLink.setAttribute('href', result.data[0].website);
                var brewLinkText = document.createTextNode(result.data[0].website);
                brewLink.appendChild(brewLinkText);
                div.appendChild(brewLink);
            }
            // brewery.description = result.description;
        // if there is an error
        }).fail(function(err) {
            throw err;
        });
    }
};
