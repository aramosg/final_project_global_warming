# final_project_global_warming
Data Analytics Bootcamp - Final Project - Team Global Warming


## Selected topic 
The cost of weather increase and natural disasters- worldwide view
 Keywords: Earth temperature – natural disasters - cost

The following link address slides with the following information: 
[slides](https://docs.google.com/presentation/d/1PCm1xK9A5wum8rRdRCrOABnPKWXaocHp/edit?usp=sharing&ouid=114301235931032176624&rtpof=true&sd=true) 

## Reason why we selected the topic 

The weather seems to behave lately in an erratic and new way that we are yet to understand.
Extreme temperatures and natural disasters might impact huge populations and world economic sectors.
A variety of aspects need to be taken into consideration with this new weather behavior (individually and business/enterprise wise). 

In the following project, we want to try at the very least to provide a clearer understanding of available data and identify statistically significant variables that might be implicated in this complex and evolving worldwide situation. This may provide light and hopefully offer not only information but also point to a model that may be the stepping stone of decision-making for different enterprises or sectors. 


## Project Outline
- Objective 
We want to analyze and understand if global warming reflected as temperature change may influence the occurrence of natural disasters and how these implications may impact the economy.

Our aim is first, using net available data sources, to provide visualization of temperature change around the globe (per country) from 1970 to 2020 along with natural disasters occurrence. Other available variables will be also mapped out, that seems to be associated like: CO2 emissions and population count, and mortality associated with natural disasters. 

Second, Using this information, to identify hard variables that may help detect danger zones. We want to find the most affected/vulnerable countries (using mortality and GDP inflation and deflation rate) and create a model trying to find if there is a correlation between these variables or which variables seem to have a higher impact. 

Lastly, we want to try to create a predictive model that may forecast the impact of global warming, natural disasters outcomes in mortality and the economy related variables that may provide important insight to different businesses and enterprises in decision making or light up red lights that make a call for back-up plans for their survival.  



- Questions we hope to answer with the data

Is there a correlation between the increase of temperature of the sampled country and the number of natural disasters? 


Can we identify the most relevant variables that can predict the impact to GDP due to natural disasters? What are those?


Which model(s) can more accurately predict the impact to GDP due to natural disasters?




## Communication protocols
GitHub and Slack


![Chronograme](resources/chronograme.png)
- Chronogram of the whole project 

## Description of their source of data (preview plan)
- Project design 
Technologies and tools: Pandas, Python, Jupyter notebook, PostgreSQL  JavaScript, Mapbox/leaflet.


### Data clean-up and final database creation
Freely available, reliable data sources were searched to obtain data sets, quantitative variables implicated with natural disasters



Data sources and webpages that asked for payment as well as had poor quality or incomplete data for the time period were excluded. 

Datasets, sources and topics are listed in the table below:

![Fig2](resources/Dataset2.png)



- Data sources: A total of eight raw datasets were obtained from different data sources. For the cleaning data and correlation process, it was important that all chosen datasets had a key-value that could be linked with one another.



Data sources list: 

[Fig1](resources/Datasources1.png)

https://www.fao.org/faostat/en/#data/ET

https://ourworldindata.org/grapher/annual-co2-emissions-per-country

https://data.worldbank.org/indicator/SP.POP.GROW?view=chart

https://data.worldbank.org/indicator/SP.POP.TOTL

https://ourworldindata.org/natural-disasters

https://datos.bancomundial.org/indicador/NV.AGR.TOTL.ZS?view=chart

https://gist.github.com/tadast/8827699

A total of eight raw datasets were cleaned using python. Unnecessary columns and data was eliminated. Countries that changed name during the time period were homogenized to one common name.


Cleaned data was then loaded into PgAdminSQL service to create queries and export seven csv files with clean relevant variables. 

![image](sql/final_project_erd.png)


### Visualization
For the first objective of data visualization, a dashboard using Javascript and Mapbox API as well as graphs using matplot will be used.

- ![Dash1](resources/lighttest.png)

Welcome page featuring an introduction to the problematic where the project was born visually enhancing the story. It will include links to rest of dashboards telling the story

- ![Dash2](resources/map.png)

Interactive map featuring dataset worldwide information using  interactive and filter able layers of information

- ![Dash3](resources/dataexplorer.png)

Further exploration using tables enabling interactive filtering of dataset.

- ![Dash4](resources/jupyternotebook.png)
Jupyter Notebooks with machine learning models of the project. 


### Logistic regression Model for vulnerable countries
Tools: Python Jupyter notebook 

-Preliminary data pre-processing:
In order to establish a machine learning model we performed first descriptive statistics to find the dirstibution o the data. THen We ran correlation test and visualizations using Spearman and Kendall in order to find relationships or trend in the data. It was followed by Salina data to understand the behavior as whole and finally plotting the distributions to check relations. 
After all this we tested using the fitting models. 

### Machine learning model 
- Tools: Python for Linear Regression, Robust Linear Regression, Random Forest Regressor Model 
They will be applied for each selected country. 
Libraries: Pandas SciKitLearn sklearn scipy statsmodels random numpy pydot multiprocessing  Visualization: seaborn matplotlib mpl_toolkits


- To test: 
start function: 
Economic damage as share of GDP = f (Total number of deaths, people affected per 100k, CO2 emissions, population, temperature anomalies, total count disasters)




- Model selection
Choose model that best answers our questions (tells the story) using previous statistical analysis as framework. 
Reason: variables with strong outliers This models, consider this characteristic.
![ModelSelection]()


### Decision making process
Taking into consideration previous results:
Linear Regression Model
Robust Linear Regression Model (Huber, RANSAC, Theil Sen)
Random Forest Regressor Model 


- Model implementation: 

Steps in each model type was as follows: Split of time series, Training and testing (linear regression or Huber and Random Forest.
The results for the machine learning models were as follows


![Table2](resources/Table2results.png)

Best model that fit was Random Forest with an R-square of 85%. 


### Explanation of model choice, limitations and benefits.


#### Linear Regression: 
- Limitations: 
Lack of continuity in certain variables 
Affected by outlayers

- Benefits: 
Preserve data absolute values
Weighted outliers
Statistic weight
Model allows to fit new variables
Prediction potential


#### Random Forest
- Limitations: 
Can easily lose interpretability
Does not allow out of sample predictions
Short them relationships are not reached (time frame) 

- Benefits: 
Model distribution does not matter
Does not require scaling of data
Same start function
Allows to see behavior in exogenous variables (domino effect) 

Recommendations for future analysis for this product developemnt: 
Cointegrated Var Model:
Make casuality Granger Test
This would allow long term relationships and perhaps able to run predictions. 



Conclusions:
- Is there a correlation between the increase of temperature of the sampled country and the number of natural disasters? Not a direct correlation, but visualization help to form new hypothesis of chained impact variables (nearby countries related). We came to recommendations 

- Can we identify the most relevant variables that can predict the impact to GDP due to natural disasters? What are those? CO2 emissions, people affected, the temperature anomalies and number of deaths. 

- Which model(s) can more accurately predict the impact to GDP due to natural disasters? 
Random forest: but due to limitations it can't predict out of sample.
Linear Regression: good to predict but it needs readjustments. 



### Telling the story

[Slides](https://docs.google.com/presentation/d/1PCm1xK9A5wum8rRdRCrOABnPKWXaocHp/edit?usp=sharing&ouid=114301235931032176624&rtpof=true&sd=true) and navigation in webpage 









