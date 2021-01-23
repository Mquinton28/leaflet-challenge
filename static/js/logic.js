var eartquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// GET request to query the URL

d3.json(earquakeUrl, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    var earthquake = L.geoJSON(earthquakeData, {
        onEachFeature: function(feature, layer)
    })
}