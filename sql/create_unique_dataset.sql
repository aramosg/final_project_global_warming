/***********CREATING ONE SINGLE LARDE DATASET*******************/

select
-- Countries catalogue
coord.country_code_alpha_three as country_code,
coord.country_name,

--Agriculture
agr.year as year,
agr.value_added_constants as agriculture_value_added_constants,
agr.value_added_percentage_gdp as agriculture_value_added_percentage_gdp,

--CO2 emissions
co2.annual_co2_emissions_tons,

--Inflation
inf.inflation_gdp_deflation as inflation_inflation_gdp_deflation,

--Natural disasters summary
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
nat_dis.number_of_deaths,

--Population
pop.population_growth_annual_percentage as population_population_growth_annual_percentage,
pop.population_total as population_population_total,

--Temperature change
temp_chg.temp_change_celsius as temperature_change_temp_change_celsius

--Creating new table from results
INTO general_dataset

FROM
final_agriculture as agr,
final_co2_emissions as co2,
final_inflation as inf,
final_natural_disasters_summary as nat_dis,
final_population as pop,
final_temperature_change as temp_chg,
country_coordinates as coord

WHERE
-- COUNTRY CODE
coord.country_code_alpha_three = agr.country_code
and coord.country_code_alpha_three = co2.country_code
and coord.country_code_alpha_three = inf.country_code
and coord.country_code_alpha_three = nat_dis.country_code
and coord.country_code_alpha_three = pop.country_code
and coord.country_code_alpha_three = temp_chg.country_code

--YEAR
and agr.year = co2.year
and agr.year = inf.year
and agr.year = nat_dis.year
and agr.year = pop.year
and agr.year = temp_chg.year 


-- TEST --
--and coord.country_code_alpha_three = 'AFG'
--and nat_dis.natural_disaster = 'disasters'
--and agr.year = 1970
--order by agr.year ASC, nat_dis.natural_disaster

--
--select * from final_natural_disasters_summary where country_code = 'AFG'
