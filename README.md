![alt-text](images/norwester_blue.png)
# EpiCoronaHack 2020

Curious about the novel coronavirus that has been in the news? Wondering how worried you should be? Want to learn how researchers estimate the incubation period, transmissibility and other key features of this emerging outbreak? Want to make your own estimates, models, and forecasts and see what you find? 

The MAGPIE research group, supported by PIMS and CANSSI, is hosting a hackathon called EpiCoronaHack. Come and join us to explore data analysis, epidemic modelling, inference, and simulation with the available coronavirus data. 

All are welcome! But some knowledge of at least one of the following is strongly recommended:  

- Mathematics: ODEs, mathematical modelling
- Statistics: stochastic models, statistical inference
- Computing: R, MATLAB, Python or similar
- Epidemiology, infectious disease modelling or outbreak analysis 

Date: Tuesday, February 18 and Wednesday, February 19, 2020

Time: 9:00am - 6:00pm on Feb. 18; 9:00am - 4:30pm on Feb. 19

Sign-in begins at 9:00 AM on Feb. 18, opening talk at 9:30 AM.
Location: Big Data Hub - ASB 10900, CANSSI area, BDH Foyer

## Content
We are suggesting the following major themes, and will provide data, links to existing analyses and suggestions for new analyses within each theme. Jump in and get started. The list below is a brainstorm; we are continually reviewing the data and analysis available, and we will pose specific suggested hacking projects on the starting day. 
 These themes overlap - models are used for estimates, estimates are used in models and forecasts, and the viral sequences play a role in the estimation. 


 (1) Estimate key outbreak parameters 

- How long does it take to develop symptoms, once someone is infected? 
 - How between their symptoms appearing, and symptoms appearing in those they infect? 
 - How many people do we expect a case to infect, early on? 

 These key parameters define central features of an outbreak and help us to predict case counts and to design control policy.  We mainly use detailed "line lists" describe case timing and location for these estimates. 

 (2) Model the outbreak


- How many cases would there have to be in total, in order for observed international case counts to have occurred? 
- How effective have control measures been at reducing transmission? 
- Will there be a resurgence in case numbers later? 
- Which places might be under-reporting case counts? 
These are just a few of the modelling questions that can be based on the estimates above. 

 (3) Make forecasts 

 - Once fitted to data, models can be used to make forecasts: What strength of control measures would we need to stop this?  
 - How many deaths are we likely to see?  
 - How are case counts going to grow over time? 
 - When will they peak, and will there be a second wave? 
 - What limits our ability to predict these things the most? 

 (4) Learn about epidemic dynamics from viral sequences 

 About 80 sequences from the outbreak are available on GISAID. They can tell us about things like when the virus likely first emerged, and about the spreading dynamics.
 
## Key terminology 

R0, the basic reproduction number: the mean number of new infections a case infects in a fully susceptible population

Incubation period: the time between exposure and symptoms

Serial interval: the time elapsed between symptoms in the infector and in their infectee

Generation time: the time between the infector getting infected and infecting their infectee

## Background reading

This is a very sparse selection of reading that participants can jump into right away. 

Imperial College London reports from the MRC Centre for Outbreak Analysis: 
https://www.imperial.ac.uk/mrc-global-infectious-disease-analysis/news--wuhan-coronavirus/
There are 4 reports. We suggest that you read these in order starting with 1. 

Backer et al - estimate the incubation period https://www.medrxiv.org/content/10.1101/2020.01.27.20018986v1

Liu et al - estimate of the basic reproduction number using confirmed case count data https://www.biorxiv.org/content/10.1101/2020.01.25.919787v1

Classics, background to Liu et al: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1766383/ and https://academic.oup.com/aje/article/160/6/509/79472

Riou and Althaus - estimate basic reproduction number with a stochastic model https://www.biorxiv.org/content/10.1101/2020.01.23.917351v1

Wu et al - estimation and forecasting using international case counts and flight information https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30260-9/fulltext#sec1 (see also the modelling theme - we have implemented this model) 


## Instructions
