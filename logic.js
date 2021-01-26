var earthquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';

// GET request to query the URL

d3.json(earthquakeURL, function(data) {
    createFeatures(data.features);
    console.log(data.features)
});

function createFeatures(earthquakeData) {
    function onEachFeature(feature, layer) {
            layer.bindPopup('<h3>Magnitude: ' + feature.properties.mag + '<h3><h3>Location: ' + feature.properties.place + '</h3><hr><p>' + new Date(feature.properties.time)+ '</p>')
        }
        function radiusSize(magnitude) {
            return magnitude * 5000;
        }
        function circleColor(magnitude) {
            if (magnitude < 1) {
                return 'dark green'
            }
            else if (magnitude < 2) {
                return 'green'
            }
            else if (magnitude < 3) {
                return 'yellow'
            }
            else if (magnitude < 4) {
                return 'orange'
            }
            else if (magnitude < 5) {
                return 'red'
            }
            else {
                return 'green'
            }
        }



// earthquake funciton
var earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: function(earthquakeData, latlong) {
        return L.circle(latlong, {
            radius: radiusSize(earthquakeData.properties.mag),
            color: circleColor(earthquakeData.properties.mag),
            fillOpacity: 1
        });
    },
    onEachFeature: onEachFeature
});

    createMap(earthquakes);
}

// set up map
// Creating map object

function createMap(earthquakes) {

  
    // Define streetmap and darkmap layers
    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoibXF1aW50b24iLCJhIjoiY2tqcHVqMmd3Njc5MzMxbnk1YmR2cmF3OCJ9.Y6fVKWWqDskeSBSMWlrYlg");
  
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibXF1aW50b24iLCJhIjoiY2tqcHVqMmd3Njc5MzMxbnk1YmR2cmF3OCJ9.Y6fVKWWqDskeSBSMWlrYlg");
  
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoibXF1aW50b24iLCJhIjoiY2tqcHVqMmd3Njc5MzMxbnk1YmR2cmF3OCJ9.Y6fVKWWqDskeSBSMWlrYlg");

  // Adding tile layer
var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoor": outdoors
};

var overlayMaps = {
    "Earthquakes": earthquakes,
}

var myMap = L.map('mapid', {
    center: [
        37.09, -97.71
    ],
    zoom: 5,
    layers: [satellite, grayscale, outdoors]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

}