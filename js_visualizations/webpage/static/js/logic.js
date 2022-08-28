console.log("Working");

// Create the map object with a center and zoom level.
let map = L.map("mapid").setView([40.7, -94.5], 4); //lat, long, zoom level (scale is 0 to 18)

// Module 13.4.2 - An array containing each city's location, state, and population.
let countryData = countries;

// SKILL DRILL - MODULE 13.4.2
countryData.forEach(function (country) {
  console.log(country);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( /*city.location*/[country.country_latitude, country.country_longitude], {
    color: "orange",
    fillColor: "orange",
    weight: 4,
    radius: country.avg_emissions/50000000
  }).bindPopup( "<h2>" + country.country_name + " (" + country.country_code + ")</h2><hr><h5> Emissions: " + country.avg_emissions.toLocaleString() + "</h5>" )
  .addTo( map );
});

//Module 13.4.1 - changing the marker for a circle
/*
L.circle([34.0522, -118.2437], {
  color: "black",
  fillColor: "yellow",
  filOpacity: 0.5,
  radius: 300, //meters
}).addTo(map);
*/

// Skill drill - Module 13.4.1
/*
L.circleMarker([34.0522, -118.2437], {
  color: "red",
  fillColor: "#ffffa1",
  radius: 300, //meters
}).addTo(map);
*/


// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  //"https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    //id: "mapbox/dark-v10",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY,
  }
);
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);
