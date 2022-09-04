-- VIS 1 - (AVG) temp increase per country
select * from final_avg_temp_increase_per_country order by country_name ASC;
--select * from final_temperature_change;
--select distinct(year) from final_temperature_change order by 1;
--select count(*) from final_temperature_change;

--Creating final table for visualization 1
select
temp.country_name, temp.country_code_alpha_three as country_code, coord.country_latitude, coord.country_longitude, temp.avg
into viz_avg_temp
from 
final_avg_temp_increase_per_country as temp,
country_coordinates as coord
where
temp.country_code_alpha_three = coord.country_code_alpha_three;

---
select * from viz_avg_temp;

--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
-- VIS 2 - CO2 emmisions
select * from final_co2_emissions;

--Creating a table with the avegrage emissions for country
select 
co2.country_name, 
co2.country_code, 
avg(co2.annual_co2_emissions_tons) as avg_emissions
into final_avg_co2_emissions
from
final_co2_emissions as co2
where 
co2.country_name != 'World'
group by co2.country_code, co2.country_name
order by co2.country_name ASC;

--final table with average co2 emissions per country
select * from final_avg_co2_emissions;

--Creating table for visualization
select
co2.country_name,
co2.country_code,
co2.avg_emissions,
coord.country_latitude,
coord.country_longitude
into viz_avg_co2_emissions
from 
final_avg_co2_emissions as co2,
country_coordinates as coord
where 
co2.country_code = coord.country_code_alpha_three;

--final table for viz -- avg co2 emissions per country
select * from viz_avg_co2_emissions;


--------------------------------------------------
--------------------------------------------------
--------------------------------------------------
-- VIS 3 - Natural disasters
select country_name, country_code, year, number_of_deaths from final_natural_disasters_summary;

--Creating table with the avg deaths from nat disasters per country
select 
country_name, 
country_code, 
avg(number_of_deaths) as avg_deaths 
into final_avg_deaths_natural_disasters
from final_natural_disasters_summary
group by country_code, country_name
order by country_name ASC;

--Table with avg deaths from nat disasters per country
select * from final_avg_deaths_natural_disasters;

--Creating table for viz
select
dis.country_name, 
dis.country_code,
dis.avg_deaths,
coord.country_latitude, 
coord.country_longitude
into viz_avg_deaths_natural_disasters
from
final_avg_deaths_natural_disasters as dis,
country_coordinates as coord
where 
dis.country_code = coord.country_code_alpha_three;

--final table for viz - deaths from natural disasters
select * from viz_avg_deaths_natural_disasters;


-------------------------------
-------------------------------
-------------------------------
--Viz tables
select * from viz_avg_temp
select * from viz_avg_co2_emissions
select * from viz_avg_deaths_natural_disasters

-----------------
-----------------
-- Creating new data explorer viz from new general dataset
select 
country_name,
country_code,
year,
annual_co2_emissions_tons,
( deaths_from_drought + deaths_from_extreme_temps + deaths_from_floods + deaths_from_storms + deaths_from_wildfires) as deaths_from_disasters,
temperature_change_temp_change_celsius,
total_count_disasters
into viz_general_table_v2
from
general_dataset_v2
order by country_name ASC, country_code ASC, year ASC;

select * from viz_general_table_v2;

