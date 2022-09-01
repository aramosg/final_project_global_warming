console.log("Working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// Deliverable 3 - Adding an additional map
let navigationNightMap = L.tileLayer(
  "https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY,
  }
);

// Create the map object with a center and zoom level.
// Create the map object with center, zoom level and default layer.
let map = L.map("mapid", {
  center: [40.7, -94.5],
  zoom: 3,
  layers: [streets],
});

// Create a base layer that holds all three maps.
let baseMaps = {
  Streets: streets,
  Satellite: satelliteStreets,
  "Navigation night": navigationNightMap
};

// 1. Add a 2nd layer group for the tectonic plate data.
let co2_emissions_layer = new L.LayerGroup();
let avg_temp_layer = new L.LayerGroup();
let natural_disasters_deaths_layer = new L.LayerGroup();

// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Co2 Emissions": co2_emissions_layer,
  "Average Temp increase": avg_temp_layer,
  "Deaths from Natural Disasters": natural_disasters_deaths_layer
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);

//////////////////////////////////////////////
//Adding CO2 emissions data to its map
let co2Data = co2EmissionsData;

co2Data.forEach(function (country) {
  //console.log(country);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( /*city.location*/[country.country_latitude, country.country_longitude], {
    color: "black",
    fillColor: "black",
    weight: 4,
    radius: country.avg_emissions/50000000
  }).bindPopup( "<h2>" + country.country_name + " (" + country.country_code + ")</h2><hr><h5> Emissions (tons): " + country.avg_emissions.toLocaleString() + "</h5>" )
  .addTo( co2_emissions_layer );
});

//adding layer to map
co2_emissions_layer.addTo(map);

//CO2
//////////////////////////////////////////////

//////////////////////////////////////////////
//Adding average temp increase to its map
let avgTempIncrease = avg_temp_increase;

avgTempIncrease.forEach(function (country) {
  //console.log(country);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( /*city.location*/[country.country_latitude, country.country_longitude], {
    color: "red",
    fillColor: "red",
    weight: 4,
    radius: country.avg * 10
  }).bindPopup( "<h2>" + country.country_name + " (" + country.country_code + ")</h2><hr><h5> Average temperature increase (Celsius): " + country.avg.toLocaleString() + "</h5>" )
  .addTo( avg_temp_layer );
});

//adding layer to map
avg_temp_layer.addTo(map);

//TEMP
//////////////////////////////////////////////

//////////////////////////////////////////////
//Adding average deaths from nat disasters to its map
let avgDeathsNatDis = avg_deaths_nat_disasters;

avgDeathsNatDis.forEach(function (country) {
  //console.log(country);
  //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
  L.circleMarker( /*city.location*/[country.country_latitude, country.country_longitude], {
    color: "yellow",
    fillColor: "yellow",
    weight: 4,
    radius: country.avg_deaths / 100
  }).bindPopup( "<h2>" + country.country_name + " (" + country.country_code + ")</h2><hr><h5> Deaths from natural disasters: " + country.avg_deaths.toLocaleString() + "</h5>" )
  .addTo( natural_disasters_deaths_layer );
});

//adding layer to map
natural_disasters_deaths_layer.addTo(map);

//Nat disasters deaths
//////////////////////////////////////////////
