select 
dis.country_name, coord.country_code_alpha_three
from
natural_disasters as dis, 
country_coordinates as coord
where
dis.country_name = coord.country_name

/**********************************/
/**********************************/
/**** AGRICULTURE TABLE **********/
select
coord.country_name,
coord.country_code_alpha_three as country_code,
agr.year,
agr.value_added_constants,
agr.value_added_percentage_gdp
into final_agriculture
from agriculture as agr, country_coordinates as coord
where
agr.country_code = coord.country_code_alpha_three
order by coord.country_code_alpha_three ASC, agr.year ASC;

select * from agriculture;
select * from final_agriculture;

select count(*) from agriculture_final where value_added_constants is null;
select count(*) from agriculture_final;

select count(*) from agriculture where value_added_constants is null;
select * from agriculture;

select country_name, country_code_alpha_three from country_coordinates where country_code_alpha_three not in
( select country_code from agriculture)

/**********************************/
/**********************************/
/*********CO2 EMISSIONS ****************/

select * from co2_emissions;

select 
country_name, country_code, year, annual_co2_emissions_tons
into final_co2_emissions
from co2_emissions
order by country_code ASC, year ASC;

select * from final_co2_emissions;

/**********************************/
/**********************************/
/***********INFLATION**************/

select * from inflation;

select 
coord.country_name,
country_code, 
year, 
inflation_gdp_deflation 
into final_inflation
from 
inflation as inf,
country_coordinates as coord
where
inf.country_code = coord.country_code_alpha_three
order by country_code ASC, year ASC;

select * from final_inflation;

/**********************************/
/**********************************/
/************NATURAL DISASTERS****************/

select * from natural_disasters -- PENDING
where summary_type = 'Total economic damages'
and data is not null;

select distinct(summary_type), count(data)
from natural_disasters
group by summary_type
order by 2 DESC;

-----------------------------------------

select * from natural_disasters_v2;
select * from natural_disasters_wide;

select distinct(natural_disaster) from natural_disasters_v2;

select 
coord.country_code_alpha_three, disasters.year, disasters.natural_disaster, disasters.summary_type, disasters.data
into final_natural_disasters
from 
natural_disasters_v2 as disasters, 
country_coordinates as coord
where
disasters.country_name = coord.country_name;

select * from final_natural_disasters;

-----------------------------------------
select * from natural_disasters_summary;

select 
nat_dis.Entity as country_name,
coord.country_code_alpha_three as country_code,
nat_dis.Year,
nat_dis.deaths_from_drought,
nat_dis.deaths_from_extreme_temps,
nat_dis.deaths_from_floods,
nat_dis.deaths_from_storms,
nat_dis.deaths_from_wildfires,
nat_dis.people_affected_by_drought_per_100k,
nat_dis.people_affected_by_extreme_temperatures_per_100k,
nat_dis.people_affected_by_floods_per_100k,
nat_dis.people_affected_by_storms_per_100k,
nat_dis.people_affected_by_wildfires_per_100k,
nat_dis.economic_damages_from_drought,
nat_dis.economic_damages_from_drought_as_a_share_of_GDP,
nat_dis.economic_damages_from_extreme_temperatures,
nat_dis.economic_damages_from_extreme_temperatures_as_a_share_of_GDP,
nat_dis.economic_damages_from_floods,
nat_dis.economic_damages_from_floods_as_a_share_of_GDP,
nat_dis.economic_damages_from_storms,
nat_dis.economic_damages_from_storms_as_a_share_of_GDP,
nat_dis.economic_damages_from_wildfires,
nat_dis.economic_damages_as_a_share_of_GDP,
nat_dis.economic_damages,
nat_dis.economic_damages_thousands,
nat_dis.people_affected_per_100k,
nat_dis.number_of_deaths
into final_natural_disasters_summary
from 
natural_disasters_summary as nat_dis,
country_coordinates as coord
where 
nat_dis.entity = coord.country_name
order by coord.country_code_alpha_three ASC, nat_dis.year ASC;

select * from final_natural_disasters_summary;



/**********************************/
/**********************************/
/***********POPULATION****************/

select * from population where (population_growth_annual_percentage is null) OR (population_total is null)
order by country_name;

select 
country_name, country_code, year, population_growth_annual_percentage, population_total
into final_population
from population
where (population_growth_annual_percentage is not null) OR (population_total is not null) order by country_code ASC, year ASC;

select * from final_population;

/**********************************/
/**********************************/
/***********TEMPERATURE CHANGE*******************/

select * from temperature_change;

--delete from temperature_change;

select distinct(country_name) from temperature_change
where country_name not in (select country_name from country_coordinates);

select 
temp_chg.country_name, coord.country_code_alpha_three as country_code, temp_chg.year, temp_chg.temp_change_celsius
into final_temperature_change
from
temperature_change as temp_chg, country_coordinates as coord
where
coord.country_name = temp_chg.country_name

select * from final_temperature_change;

select 
country_coordinates.country_name, 
final_temperature_change.country_code_alpha_three, 
avg(temp_change_celsius) 
into final_avg_temp_increase_per_country
from final_temperature_change, country_coordinates 
where final_temperature_change.country_code_alpha_three = country_coordinates.country_code_alpha_three
group by final_temperature_change.country_code_alpha_three, country_coordinates.country_name
order by country_coordinates.country_name;

select * from final_avg_temp_increase_per_country;

select year, temp_change_celsius from final_temperature_change where country_code_alpha_three = 'USA';

/**********************************/
/**********************************/
/**********************************/
/**********************************/
/**********************************/
/****ALL FINAL TABLES**************/
select * from final_agriculture;
select * from final_co2_emissions;
select * from final_inflation;
select * from final_natural_disasters_summary;
select * from final_population;
select * from final_temperature_change;
---
select * from final_avg_temp_increase_per_country; 







