/*
Country Coordinates Catalogue
*/
CREATE TABLE country_coordinates (
	country_name VARCHAR(100) NOT NULL,
	country_code_alpha_two varchar(2) NOT NULL,
	country_code_alpha_three varchar(3) NOT NULL,
	country_numeric_code INT NOT NULL,
	country_latitude DECIMAL NOT NULL,
	country_longitude DECIMAL NOT NULL
);
--select * from country_coordinates;

/*
CO2 emissions table
*/

CREATE TABLE co2_emissions (
	country_name VARCHAR(100) NOT NULL,
	country_code VARCHAR(10) NOT NULL,
	year INT NOT NULL,
	annual_co2_emissions_tons BIGINT NOT NULL
);
--select * from co2_emissions;
--select * from co2_emissions where length(code) > 3;

/*
Population table
*/
CREATE TABLE population (
	country_name VARCHAR(100) NOT NULL,
	country_code VARCHAR(10) NOT NULL,
	year INT NOT NULL,
	population_growth_annual_percentage DECIMAL,
	population_total BIGINT
);
--select * from population;
--select * from population where population_total is null;

/*
Agriculture table
*/
CREATE TABLE agriculture (
	country_name VARCHAR(100) NOT NULL,
	country_code VARCHAR(10) NOT NULL,
	year INT NOT NULL,
	value_added_constants DECIMAL,
	value_added_percentage_gdp DECIMAL
);
--select * from agriculture;

/*
Inflation table
*/
CREATE TABLE inflation (
	country_name VARCHAR(100) NOT NULL,
	country_code VARCHAR(10) NOT NULL,
	year INT NOT NULL,
	inflation_gdp_deflation DECIMAL
);

--select * from inflation;

/*
Natural disasters table
*/
CREATE TABLE natural_disasters (
	country_name VARCHAR(100) NOT NULL,
	year INT NOT NULL,
	natural_disaster VARCHAR(50),
	summary_type VARCHAR(50),
	type VARCHAR(100),
	data DECIMAL
);

CREATE TABLE natural_disasters_v2 (
	country_name VARCHAR(100) NOT NULL,
	year INT NOT NULL,
	natural_disaster VARCHAR(50),
	summary_type VARCHAR(50),
	data DECIMAL
);

CREATE TABLE natural_disasters_wide (
	country_name VARCHAR(100) NOT NULL,
	year INT NOT NULL,
	summary_type VARCHAR(50),
	disasters DECIMAL,
	drought DECIMAL,
	earthquakes DECIMAL,
	extreme_temperatures DECIMAL,
	floods DECIMAL,
	landslide DECIMAL,
	mass_movements DECIMAL,
	storms DECIMAL,
	volcanic DECIMAL,
	wildfires DECIMAL
);

CREATE TABLE natural_disasters_summary (
	Entity VARCHAR(100) NOT NULL,
	Year INT NOT NULL,
	deaths_from_drought DECIMAL ,
	deaths_from_extreme_temps DECIMAL ,
	deaths_from_floods DECIMAL ,
	deaths_from_storms DECIMAL ,
	deaths_from_wildfires DECIMAL ,
	people_affected_by_drought_per_100k DECIMAL ,
	people_affected_by_extreme_temperatures_per_100k DECIMAL ,
	people_affected_by_floods_per_100k DECIMAL ,
	people_affected_by_storms_per_100k DECIMAL ,
	people_affected_by_wildfires_per_100k DECIMAL ,
	economic_damages_from_drought DECIMAL ,
	economic_damages_from_drought_as_a_share_of_GDP DECIMAL ,
	economic_damages_from_extreme_temperatures DECIMAL ,
	economic_damages_from_extreme_temperatures_as_a_share_of_GDP DECIMAL ,
	economic_damages_from_floods DECIMAL ,
	economic_damages_from_floods_as_a_share_of_GDP DECIMAL ,
	economic_damages_from_storms DECIMAL ,
	economic_damages_from_storms_as_a_share_of_GDP DECIMAL ,
	economic_damages_from_wildfires DECIMAL ,
	economic_damages_as_a_share_of_GDP DECIMAL ,
	economic_damages DECIMAL ,
	economic_damages_thousands DECIMAL ,
	people_affected_per_100k DECIMAL ,
	number_of_deaths DECIMAL
);

--select * from natural_disasters;
--select * from natural_disasters_summary;

/*
Temperature change table
*/

CREATE TABLE temperature_change (
	area_code INT NOT NULL,
	country_name VARCHAR(100) NOT NULL,
	year INT NOT NULL,
	temp_change_celsius DECIMAL
);

--select * from temperature_change; 
