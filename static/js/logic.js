// set up map
// Creating map object
var myMap = L.map("map", {
    center: [34.0522, -118.2437],
    zoom: 8
  });
  
  // Adding tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);




var eartquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// GET request to query the URL

d3.json(earquakeUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer) {
            layer.bindPopup('<h3>Magnotude: ' + feature.properties.mag + '<h3><h3>Location: ' + feature.properties.place + '</h3><hr><p>' + new Date(feature.properties.time)+ '</p>');
        }
    })
}