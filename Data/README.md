
# Data

In this folder we will post data, and links to data, from the Coronavirus outbreak. Some of these datasets will be formatted
for the suggested analyses within each theme. Some will be extra datasets for which we do not have a goal in mind, but may come 
in useful depending on the ideas and direction of each group. Of course, participants are also welcome to find and incorporate
new data sources!


## Data descriptions



## Links to data

### Line lists:

[Kudos line list data](https://docs.google.com/spreadsheets/d/1jS24DjSPVWa4iuxuD4OAXrE3QeI8c9BC1hSlqr-NMiU/edit#gid=1187587451). Compiled list of cases with lots of info (524 cases as of 13/02). Definition of a 'confirmed' case is unclear. Backer et al used this in their analysis. Maintained by Dr. Kaiyuan Sun (NIH, USA)

[nCoV line list](https://docs.google.com/spreadsheets/d/1itaohdPiAeniCXNlntNztZ_oRvjh0HsGuJXUJWET008/edit#gid=0). Another line list dataset, inside and outside Hubei province. 


### Case counts:

[China province data](https://docs.google.com/spreadsheets/d/1gTj4zFMfXRk92CCQAOwa04ZBhqJ4oSmQFm_nb8-YXbw/edit#gid=0). Cases per province per day. 

[Read et al Github](https://github.com/chrism0dwk/wuhan). Github repo with code for Read et al analysis. Contains case count data for China and international, but missing flight data from OAG traffic analyzer for licensing reasons. It is not clear why they list relatively few cases in Wuhan (74 on Jan 22, 0 on Jan 23 and 24).

[Johns Hopkins IDD team data](https://gisanddata.maps.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6). Case count data, which we have [digitized here](https://docs.google.com/spreadsheets/d/1PbC12F9_WlJNBafwM7uwli0jhT3v_jlCL0dqukAjfJM/edit#gid=0) up to 05/02. 

[JHU CSSE data](https://docs.google.com/spreadsheets/d/1wQVypefm946ch4XDp37uZ-wartW4V7ILdg-qYiDXUHM/htmlview?usp=sharing&sle=true#). Case count data curated by Johns Hopkins University Center for Systems Science and Engineering. Someone has formatted this to [csv on Kaggle here](https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset), and as of 11/02 the JHU team is making the data available on [Github here](https://github.com/CSSEGISandData/COVID-19).

[Patrick Tung's translated data](https://towardsdatascience.com/an-r-package-to-explore-the-novel-coronavirus-590055738ad6). Blog detailing an English translation of Guangchuang Yu's (a professor of bioinformatics at Southern Medical University) R package, which includes current case counts from tencent data. This is a very new package, and we have not seen any preprints using this data yet, but it seems to be very up to date (at my last check, the data had been updated 10 minutes previously). Contains cases by country, by Chinese province and by Chinese city, which can be displayed cumulatively or by day. 

### Travel data

[Tencent’s LBS (location-based services) database](https://heat.qq.com/). The daily number of Chinese domestic passengers by means of air, train and road transportation, recorded by Tencent’s LBS database. Used in the Wu et al analysis. **However** this website is written in Chinese! If anyone is willing to translate and extract the data this would be excellent.  

[China civil aviation annual report](http://www.caac.gov.cn/en/HYYJ/NDBG/201810/W020181026601069968468.pdf). More travel information than data - includes e.g. in 2017, Chinese passenger flights were on average 83.2% full. 

[Bogoch et al 2020](https://academic.oup.com/jtm/advance-article/doi/10.1093/jtm/taaa008/5704418). Data on volume of passengers flying Wuhan to international cities Jan-Mar 2018

[Travel China guide](https://www.travelchinaguide.com/china-trains/wuhan-station.htm). Information on train schedules from different Wuhan train stations (there are 4) to Chinese cities, Would need compiling, and can we be confident this is reliable? Also would need adjustments for not full trains. 

[YVR flight data](https://www.yvr.ca/en/about-yvr/facts-and-stats). YVR airprt have some passenger data freely available on their website. In particular, 'Airlines and Destinations' lists the number of planes per week to each destination airport for the winter 2019 season. 'Traffic Update' and 'Enplaned and Deplaned Passengers' list the total number of passengers by region over time. From these documents, the number of passengers per flight could be approximately inferred. Could we use this data to help estimate the number of nCoV importations to Vancouver?

[flirt](https://flirt.eha.io/) FLIRT is a network analysis tool enabling close examination of flight networks. 
See also ecohealthalliance.org/program/flirt  There are databases that are cheaper if you can use an API eg http://aviationstack.com.

### Other data

[Wu et al (2020)](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30260-9/fulltext#seccestitle150) and [supplementary information](https://www.thelancet.com/cms/10.1016/S0140-6736(20)30260-9/attachment/f77f1dc7-43a5-4d5e-a709-5cf061abdfdc/mmc1.pdf). Contains various data tables of line list data, social and personal non-pharmaceutical interventions implemented in China, and relevant information from SARS and MERS. A digitized version of Supplementary table 1 is included in this folder. 

[Singaporean case data](https://www.moh.gov.sg/covid-19/past-updates). Updates from Singapore's Ministry of Health on Singaporean nCoV cases, fairly detailed. We believe that no one has analysed this data yet - they could be used to estimate the serial interval among these cases. 

A new cluster dataset, courtesy of Dongxuan Chen and Jacco Wallinga at RIVM in the Netherlands. This data needs a Mandarin-speaking person to do re-entry (for error checking); then it could be used to re-estimate key parameters: incubation period, time between infection and symptoms. It would also be fun to create interactive network visualizations for this dataset. See files for Tianjin. 


