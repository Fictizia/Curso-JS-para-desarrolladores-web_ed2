/*global Firebase, google, $ */

(function () {
    "use strict";
    var map, buses, ref;
    buses = {};
    ref = new Firebase("https://publicdata-transit.firebaseio.com/");

    function newBus(bus, firebaseId) {
        var busLatLng, tag, marker;
        busLatLng = new google.maps.LatLng(bus.lat, bus.lon);
        tag = bus.routeTag.toString()[0].toUpperCase() + bus.routeTag.toString().slice(1);
        marker = new google.maps.Marker({
            icon: "http://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=bus|bbT|" + tag + "|7094FF|eee",
            position: busLatLng,
            map: map
        });
        buses[firebaseId] = marker;
    }

    function feq(f1, f2) {
        return (Math.abs(f1 - f2) < 0.000001);
    }

    google.maps.Marker.prototype.animatedMoveTo = function (toLat, toLng) {
        var fromLat, fromLng, frames, percent, curLat, curLng, move;
        fromLat = this.getPosition().lat();
        fromLng = this.getPosition().lng();
        if (feq(fromLat, toLat) && feq(fromLng, toLng)) {
            return;
        }
        frames = [];
        for (percent = 0; percent < 1; percent += 0.005) {
            curLat = fromLat + percent * (toLat - fromLat);
            curLng = fromLng + percent * (toLng - fromLng);
            frames.push(new google.maps.LatLng(curLat, curLng));
        }
        move = function (marker, latlngs, index, wait) {
            marker.setPosition(latlngs[index]);
            if (index !== latlngs.length - 1) {
                setTimeout(function () {
                    move(marker, latlngs, index + 1, wait);
                }, wait);
            }
        };
        move(this, frames, 0, 25);
    };

    function start() {
        var name, mapOptions, f, system;
        
        for (var sysId in transitSystems) {
            var systemData = transitSystems[sysId];
            $("#system").append($("<option value='" + sysId + "'>" + systemData.name + "</option>"))
        }
        
        $("#system").change(function () {
            if (f) f.off();
            
            system = Number($("#system").val());
            
            name = transitSystems[system].tag;
            mapOptions = {
                center: new google.maps.LatLng(
                    transitSystems[system].lat,
                    transitSystems[system].lon
                ),
                zoom: transitSystems[system].zoom || 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
            f = ref.child(name + "/vehicles").limit(200);
            f.once("value", function (s) {
                s.forEach(function (b) {
                    newBus(b.val(), b.name());
                });
            });
            f.on("child_changed", function (s) {
                var busMarker = buses[s.name()];
                if (typeof busMarker === "undefined") {
                    newBus(s.val(), s.name());
                } else {
                    busMarker.animatedMoveTo(s.val().lat, s.val().lon);
                }
            });
            f.on("child_removed", function (s) {
                var busMarker = buses[s.name()];
                if (typeof busMarker !== "undefined") {
                    busMarker.setMap(null);
                    delete buses[s.name()];
                }
            });
        });
        
        $("#system").change();
    }

    $(start);

    var transitSystems = [ 
        { lat: 37.7789,
         lon: -122.3917,
         tag: 'sf-muni',
         city: 'San Francisco',
         state: 'CA',
         name: 'SF MUNI',
         zoom: 15 },
        { lat: 41.834781,
         lon: -87.681198,
         tag: 'ctabus',
         city: 'Chicago',
         state: 'IL',
         name: 'CTA Bus',
         zoom: 12 },
        { lat: 40.85,
         lon: -73.866667,
         tag: 'bronx',
         city: 'New York',
         state: 'NY',
         name: 'NYC MTA - Bronx',
         zoom: 15 },
        { lat: 40.648476,
         lon: -74.011631,
         tag: 'brooklyn',
         city: 'New York',
         state: 'NY',
         name: 'NYC MTA - Brooklyn',
         zoom: 14 },
        { lat: 40.579532,
         lon: -74.150201,
         tag: 'staten-island',
         city: 'New York',
         state: 'NY',
         name: 'NYC MTA - Staten Island',
         zoom: 14 },
        { lat: 37.765206,
         lon: -122.241636,
         tag: 'actransit',
         city: 'Alameda',
         state: 'CA',
         name: 'AC Transit',
         zoom: 12 },
        { lat: 39.099275,
         lon: -76.848306,
         tag: 'howard',
         city: 'Laurel',
         state: 'MD',
         name: 'CMRT and Howard Transit',
         zoom: 12 },
        { lat: 41.688181,
         lon: -70.258134,
         tag: 'ccrta',
         city: 'Cape Cod',
         state: 'MA',
         name: 'Cape Cod Regional Transit Authority',
         zoom: 10 },
        { lat: 35.9132,
         lon: -79.055845,
         tag: 'chapel-hill',
         city: 'Chapel Hill',
         state: 'NC',
         name: 'Chapel Hill Transit',
         zoom: 14 },
        { lat: 42.361826,
         lon: -71.085298,
         tag: 'charles-river',
         city: 'Cambridge',
         state: 'MA',
         name: 'Charles River TMA EZRide',
         zoom: 14 },
        { lat: 39.290385,
         lon: -76.612189,
         tag: 'charm-city',
         city: 'Baltimore',
         state: 'MD',
         name: 'Charm City Circulator',
         zoom: 14 },
        { lat: 34.366495,
         lon: -89.519248,
         tag: 'oxford-ms',
         city: 'Oxford',
         state: 'MI',
         name: 'City of Oxford',
         zoom: 14 },
        { lat: 40.714353,
         lon: -74.005973,
         tag: 'da',
         city: 'New York',
         state: 'NY',
         name: 'NYC Downtown Connection',
         zoom: 15 },
        { lat: 37.503473,
         lon: -122.122331,
         tag: 'dumbarton',
         city: 'Alameda',
         state: 'CA',
         name: 'Dumbarton Express',
         zoom: 12 },
        { lat: 37.831316,
         lon: -122.285247,
         tag: 'emery',
         city: 'Emeryville',
         state: 'CA',
         name: 'Emery-Go-Round',
         zoom: 14 },
        { lat: 34.142508,
         lon: -118.255075,
         tag: 'glendale',
         city: 'Glendale',
         state: 'CA',
         name: 'Glendale Beeline',
         zoom: 14 },
        { lat: 34.197505,
         lon: -119.177052,
         tag: 'south-coast',
         city: 'Oxnard',
         state: 'CA',
         name: 'Gold Coast Transit',
         zoom: 12 },
        { lat: 34.052234,
         lon: -118.243685,
         tag: 'lametro',
         city: 'Los Angeles',
         state: 'CA',
         name: 'Los Angeles Metro',
         zoom: 14 },
        { lat: 34.052234,
         lon: -118.243685,
         tag: 'lametro-rail',
         city: 'Los Angeles',
         state: 'CA',
         name: 'Los Angeles Rail',
         zoom: 11 },
        { lat: 42.34067,
         lon: -71.08711,
         tag: 'mbta',
         city: 'Cambridge',
         state: 'MA',
         name: 'Massachusetts Bay Transit',
         zoom: 14 },
        { lat: 34.285558,
         lon: -118.882041,
         tag: 'moorpark',
         city: 'Moorpark',
         state: 'CA',
         name: 'Moorpark Transit',
         zoom: 14 },
        { lat: 32.775296,
         lon: -117.218456,
         tag: 'nctd',
         city: 'San Diego',
         state: 'CA',
         name: 'North County Transit District',
         zoom: 11 },
        { lat: 34.108345,
         lon: -117.289765,
         tag: 'omnitrans',
         city: 'San Bernardino',
         state: 'CA',
         name: 'Omnitrans' },
        { lat: 30.332804,
         lon: -87.14977,
         tag: 'sria',
         city: 'Santa Rosa Island',
         state: 'FL',
         name: 'Pensacola Beach (SRIA)',
         zoom: 11 },
        { lat: 45.523452,
         lon: -122.676207,
         tag: 'portland-sc',
         city: 'Portland',
         state: 'OR',
         name: 'Portland Streetcar',
         zoom: 14 },
        { lat: 38.784921,
         lon: -76.872096,
         tag: 'pgc',
         city: 'Largo',
         state: 'MD',
         name: 'Prince George\'s County',
         zoom: 10 },
        { lat: 39.529633,
         lon: -119.813803,
         tag: 'reno',
         city: 'Reno',
         state: 'NV',
         name: 'RTC RIDE',
         zoom: 14 },
        { lat: 37.131792,
         lon: -80.576448,
         tag: 'radford',
         city: 'Radford',
         state: 'VA',
         name: 'Radford Transit',
         zoom: 14 },
        { lat: 40.762161,
         lon: -73.949964,
         tag: 'roosevelt',
         city: 'New York',
         state: 'NY',
         name: 'Roosevelt Island',
         zoom: 14 },
        { lat: 47.606209,
         lon: -122.332071,
         tag: 'seattle-sc',
         city: 'Seattle',
         state: 'WA',
         name: 'Seattle Streetcar',
         zoom: 14 },
        { lat: 34.269447,
         lon: -118.781482,
         tag: 'simi-valley',
         city: 'Simi Valley',
         state: 'CA',
         name: 'SVT',
         zoom: 14 },
        { lat: 34.170561,
         lon: -118.837594,
         tag: 'thousand-oaks',
         city: 'Thousand Oaks',
         state: 'CA',
         name: 'Thousand Oaks Transit (TOT)' },
        { lat: 38.544907,
         lon: -121.740517,
         tag: 'unitrans',
         city: 'Davis',
         state: 'CA',
         name: 'Unitrans ASUCD Davis',
         zoom: 14 },
        { lat: 34.27464,
         lon: -119.229005,
         tag: 'vista',
         city: 'Ventura',
         state: 'CA',
         name: 'Ventura Intercity (VISTA)',
         zoom: 14 },
        { lat: 48.380895,
         lon: -89.247682,
         tag: 'thunderbay',
         city: 'Thunder Bay',
         state: 'Ontario, Canada',
         name: 'Thunder Bay Transit' },
        { lat: 45.606649,
         lon: -73.712409,
         tag: 'stl',
         city: 'Laval',
         state: 'Quebec, Canada',
         name: 'Societe de transport de Laval',
         zoom: 12 },
        { lat: 43.653226,
         lon: -79.383184,
         tag: 'ttc',
         city: 'Toronto',
         state: 'Ontario, Canada',
         name: 'Toronto Transit Commission',
         zoom: 14 },
        { lat: 38.907231,
         lon: -77.036464,
         tag: 'dc-circulator',
         city: 'Washington DC',
         state: 'District of Columbia',
         name: 'Washington DC Circulator' },
        { lat: 40.739026,
         lon: -74.16874,
         tag: 'rutgers-newark',
         city: 'Newark',
         state: 'NJ',
         name: 'Rutgers University Newark',
         zoom: 14 },
        { lat: 40.500956,
         lon: -74.447343,
         tag: 'rutgers',
         city: 'New Brunswick',
         state: 'NJ',
         name: 'Rutgers University',
         zoom: 14 },
        { lat: 37.784891,
         lon: -122.438928,
         tag: 'ucsf',
         city: 'San Francisco',
         state: 'CA',
         name: 'University of California San Francisco' },
        { lat: 38.986937,
         lon: -76.942868,
         tag: 'umd',
         city: 'College Park',
         state: 'MD',
         name: 'University of Maryland',
         zoom: 14 },
        { lat: 36.99032,
         lon: -86.443602,
         tag: 'wku',
         city: 'Bowling Green',
         state: 'KY',
         name: 'Western Kentucky University',
         zoom: 11 },
        { lat: 44.97399,
         lon: -93.227729,
         tag: 'umn-twin',
         city: 'Minneapolis',
         state: 'MN',
         name: 'University of Minnesota',
         zoom: 14 },
        { lat: 43.134549,
         lon: -70.930116,
         tag: 'unh',
         city: 'Durham',
         state: 'NH',
         name: 'University of New Hampshire',
         zoom: 15 },
        { lat: 40.807536,
         lon: -73.962573,
         tag: 'ccny',
         city: 'New York',
         state: 'NY',
         name: 'City College NYC',
         zoom: 14 },
        { lat: 42.027639,
         lon: -93.635233,
         tag: 'cyride',
         city: 'Ames',
         state: 'IA',
         name: 'CyRide Iowa' },
        { lat: 38.832997,
         lon: -77.30837,
         tag: 'gmu',
         city: 'Fairfax',
         state: 'VA',
         name: 'George Mason University',
         zoom: 13 },
        { lat: 39.345681,
         lon: -76.618643,
         tag: 'loyola',
         city: 'Baltimore',
         state: 'MD',
         name: 'Loyola University Maryland',
         zoom: 15 },
        { lat: 42.358867,
         lon: -71.093825,
         tag: 'mit',
         city: 'Cambridge',
         state: 'MA',
         name: 'Massachusetts Institute of Technology',
         zoom: 15 },
        { lat: 35.607482,
         lon: -77.366959,
         tag: 'ecu',
         city: 'Greenville',
         state: 'NC',
         name: 'East Carolina University',
         zoom: 13 },
        { lat: 40.063143,
         lon: -79.882095,
         tag: 'calu-pa',
         city: 'California',
         state: 'PA',
         name: 'California University of Pennsylvania' },
        { lat: 33.081995,
         lon: -83.230898,
         tag: 'georgia-college',
         city: 'Milledgeville',
         state: 'GA',
         name: 'Georgia College' } ]

    }());