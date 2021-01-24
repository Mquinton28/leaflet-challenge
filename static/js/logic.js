var eartquakeURL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// GET request to query the URL

d3.json(earquakeURL, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h3>Magnotude: ' + feature.properties.mag + '<h3><h3>Location: ' + feature.properties.place + '</h3><hr><p>' + new Date(feature.properties.time)+ '</p>');
        }
    });

    createMap(earthquakes);
}

// set up map
// Creating map object

function createMap(earthquakes)

  
    // Define streetmap and darkmap layers
    var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?" +
      "access_token=pk.eyJ1IjoiYXN3YXRoeW0iLCJhIjoiY2plajZjcGk5MDQ3ajJ3bWQ5bTlxY2I0dSJ9._Dq0RpjIWL058qCxH3LmOA");
  
    var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXN3YXRoeW0iLCJhIjoiY2plajZjcGk5MDQ3ajJ3bWQ5bTlxY2I0dSJ9._Dq0RpjIWL058qCxH3LmOA");
  
    var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
    "access_token=pk.eyJ1IjoiYXN3YXRoeW0iLCJhIjoiY2plajZjcGk5MDQ3ajJ3bWQ5bTlxY2I0dSJ9._Dq0RpjIWL058qCxH3LmOA");

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
    layers: [satellite]
});

