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
coord.country_code_alpha_three, agr.year, agr.value_added_constants, agr.value_added_percentage_gdp
into final_agriculture
from agriculture as agr, country_coordinates as coord
where
agr.country_code = coord.country_code_alpha_three;

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

select * from co2_emissions

/**********************************/
/**********************************/
/***********INFLATION**************/

select * from inflation;

select country_code, year, inflation_gdp_deflation 
into final_inflation
from inflation;

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


/**********************************/
/**********************************/
/***********POPULATION****************/

select * from population where (population_growth_annual_percentage is null) OR (population_total is null)
order by country_name;

select 
country_code, year, population_growth_annual_percentage, population_total
into final_population
from population
where (population_growth_annual_percentage is not null) OR (population_total is not null);

select * from final_population;

/**********************************/
/**********************************/
/***********TEMPERATURE CHANGE*******************/

select * from temperature_change;

--delete from temperature_change;

select distinct(country_name) from temperature_change
where country_name not in (select country_name from country_coordinates);

select 
coord.country_code_alpha_three, temp_chg.year, temp_chg.temp_change_celsius
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


