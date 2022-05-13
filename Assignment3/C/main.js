// IIFE
(() => {

    // Config for setting max and min route numbers
    let config = {
        max: 10,
        min: 0
    };

    // Get busses function, used for retreiving bus data and than returninh the geoJson data
    let getBusses = function(json, max, L, map) {
        let count = 0;
        let newJson = {
            "type": "FeatureCollection",
            "features": []
        };
        json.entity.reduce((previous, current) => {
            if ((parseInt(current.vehicle.trip.routeId) <= config.max) && (parseInt(current.vehicle.trip.routeId) >= config.min)) {
                data = convGeoJson(current);
                newJson.features.push(data);
            }
        }, count);
        return newJson;
    }
    
    // converts the inputed data from the halifax transit database for each bus to geoJson data
    let convGeoJson = function(json) {
        newJson = {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [0, 0]
            },
            "properties": {}
        };
        newJson.geometry.coordinates[1] = json.vehicle.position.latitude;
        newJson.geometry.coordinates[0] = json.vehicle.position.longitude;
        newJson.properties.name = "Route " + json.vehicle.trip.routeId;
        newJson.properties.rotation = json.vehicle.position.bearing;
        return newJson;
    }

    // main function
    let main = function(url) {

        //create map in leaflet and tie it to the div called 'theMap'
        let map = L.map('theMap').setView([44.650627, -63.597140], 14);

        // create tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

        // define set var (contains the pointers for the busses)
        let set;
        
        // init function, this is the looping code that updates the map.
        const init = function() {
            fetch(url).then(res => res.json()).then(data => result = data).then(() => {
                try {
                   set.remove();
                }
                catch (err) {}
                set = L.geoJson([getBusses(result, config.max, L)], {
                    pointToLayer: function(feature, coord) {
                        let iconN = new L.Icon({
                            iconSize: [40, 41],
                            iconAnchor: [20, 20.5],
                            popupAnchor:  [1, -24],
                            iconUrl: './bus.png'
                        });
                        return L.marker(coord, {icon: iconN, rotationAngle: feature.properties.rotation});
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup(feature.properties.name);
                    }
                }).addTo(map);
            });

            // set loop timeout (and looping function)
            setTimeout(init, 10000);
        }

        // loop
        init();
    }

    // run
    main("https://hrmbusapi.herokuapp.com/");
})();