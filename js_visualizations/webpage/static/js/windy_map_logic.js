function initMap(){

    var Esri_WorldImagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    var Esri_DarkGreyCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }
    );

    let streets = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          accessToken: API_KEY,
        }
      );
      
      let satelliteStreets = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          accessToken: API_KEY,
        }
      );
      
      let navigationNightMap = L.tileLayer(
        "https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}",
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          accessToken: API_KEY,
        }
      );

    var baseLayers = {
        "Satellite": Esri_WorldImagery,
        "Grey Canvas": Esri_DarkGreyCanvas,
        "Streets": streets,
        "Satelliete streets": satelliteStreets,
        "Night map": navigationNightMap
    };

    var map = L.map('map', {
        layers: [ streets ]
    });

    //var layerControl = L.control.layers(baseLayers);
    //layerControl.addTo(map);
    //map.setView([50.00, 14.44], 3);

    /* Layers with info for : temp, natural disasters, y co2 emissions*/

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

    var layerControl = L.control.layers(baseLayers, overlays);
    layerControl.addTo(map);
    map.setView([50.00, 14.44], 3);

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

    /* END Layers with info for : temp, natural disasters, y co2 emissions*/

    return {
        map: map,
        layerControl: layerControl
    };
}

// demo map
var mapStuff = initMap();
var map = mapStuff.map;
var layerControl = mapStuff.layerControl;
var handleError = function(err){
    console.log('handleError...');
    console.log(err);
};

WindJSLeaflet.init({
	localMode: true,
	map: map,
	layerControl: layerControl,
	useNearest: false,
	timeISO: null,
	nearestDaysLimit: 7,
	displayValues: true,
	displayOptions: {
		displayPosition: 'bottomleft',
		displayEmptyString: 'No wind data'
	},
	overlayName: 'Wind',

	// https://github.com/danwild/wind-js-server
	pingUrl: 'http://localhost:7000/alive',
	latestUrl: 'http://localhost:7000/latest',
	nearestUrl: 'http://localhost:7000/nearest',
	errorCallback: handleError
});