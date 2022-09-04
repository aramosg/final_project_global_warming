console.log("Working in windy");

const options = {
  // Required: API key
  key: "QNIrlZDUaeY968KLnL0iI72YfPacAxwh", // REPLACE WITH YOUR KEY !!!

  // Put additional console output
  verbose: true,

  // Optional: Initial state of the map
  //lat: 50.4,
  //lon: 14.3,
  //zoom: 5,
};

windyInit(options, (windyAPI) => {
  // windyAPI is ready, and contain 'map', 'store',
  // 'picker' and other usefull stuff

  const { store, map } = windyAPI;
  // .map is instance of Leaflet map

  //L.popup().setLatLng([50.4, 14.3]).setContent("Hello World").openOn(map);

  let co2_emissions_layer = new L.LayerGroup();
  let avg_temp_layer = new L.LayerGroup();
  let natural_disasters_deaths_layer = new L.LayerGroup();

  let overlays = {
    "Co2 Emissions": co2_emissions_layer,
    "Average Temp increase": avg_temp_layer,
    "Deaths from Natural Disasters": natural_disasters_deaths_layer
  };

  let co2Data = co2EmissionsData;
  co2Data.forEach(function (country) {
    //console.log(country);
    //L.marker( city.location ).bindPopup( "<h2>" + city.city + ", " + city.state + "</h2><hr><h3> Population: " + city.population.toLocaleString() + "</h3>" )
    L.circleMarker(
      /*city.location*/ [country.country_latitude, country.country_longitude],
      {
        color: "black",
        fillColor: "black",
        weight: 4,
        radius: country.avg_emissions / 50000000,
      }
    )
      .bindPopup(
        "<h2>" +
          country.country_name +
          " (" +
          country.country_code +
          ")</h2><hr><h5> Emissions (tons): " +
          country.avg_emissions.toLocaleString() +
          "</h5>"
      )
      .addTo(co2_emissions_layer);
  });

  //adding layer to map
  co2_emissions_layer.addTo(map);


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


store.set( 'overlay', 'temp' );
console.log( ':::: Allowed:' );
console.log( store.getAllowed( 'overlay' ) );

});

//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
//////////////////////////////
