# Estimate Outbreak Parameters

This theme overlaps with modelling quite a bit, since we often use models to estimate. 

## Introduction

Particularly during the initial stages of an novel-pathogen outbreak, estimation of quantities such as the serial interval, generation time and basic reproduction number are key to develop an understanding of the disease and how the outbreak might progress. These can help formulate effective control strategies, and allow public health agencies to prepare. As an outbreak progresses, we can also begin to estimate further parameters such as case fatality rates. 

## Some analyses of this outbreak, where code is available or feasible to write

[Imperial College London's MRC Centre for Outbreak analysis report 4](https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-College-2019-nCoV-severity-10-02-2020.pdf). This report estimates the case fatality rate (CFR) of coronavirus cases in Hubei province, elsewhere in China, and internationally. Using a Bayesian approach, they estimate the disease onset-to-recovery time and onset-to-death time distributions. They continue to estimate the CFR using a stastistical model. Required data is linked at the end of the report. 

[Christian Althaus' CFR estimate](https://github.com/calthaus/ncov-cfr). Christian Althaus, University of Bern, has estimated a preliminary case fatality rate based on (the previous total of) 1 observed nCoV death outside of China. Maximum likelihood estimation is used to fit a statistical model for the number of observed deaths to the data. This approach could be updated with more recent data. 

[Niehus et al](https://www.medrxiv.org/content/10.1101/2020.02.13.20022707v1.full.pdf). This group from Harvard university estimate the underdetection of COVID-19 cases by assuming data collected in Singapore has near-perfect detection, and inferring from that how many cases would have been expected elsewhere by incorporating travel data. They use a Bayesian model and MCMC to do this.

[Backer et al](https://www.medrxiv.org/content/10.1101/2020.01.27.20018986v2) estimate the incubation period of 2019-nCoV infections using the Kudos line list data (linked in the Github data folder) for infectives with recent travel data. By combining the date of symptom onset with travel information, they inferred possible values for the incubation period per case. R code and data are available, and this analysis has potential to be updated with newer data.

[Johns Hopkins IDD team](https://www.medrxiv.org/content/10.1101/2020.02.02.20020016v1) similarly infer the incubation period from around 100 confirmed cases. They use survival analysis based on the fact that each infective will have a particular 'window' of time to have been infected. Code and data are available [from their Github repository](https://github.com/HopkinsIDD/ncov_incubation#data-summary). Could be updated with new data. 

[Abbott et al](https://wellcomeopenresearch.org/articles/5-17) used a stochastic branching process simulation model (similar to that used in the Imperial College report 3) to compare different scenarios for the initial outbreak size, the duration of the initial transmission event, the serial interval, and R0. It appears they accepted simulations whose number of cases were close to the observed total cases on January 25th; this could be updated with newer case counts or, potentially, by first estimating the true number of cases, given presumed under-reporting. 



## Note:
To view the .html analysis files in this folder, append the web address with http://htmlpreview.github.com/? i.e. go to http://htmlpreview.github.io/?https://github.com/EpiCoronaHack/Hackathon2020/blob/master/Estimation/incubation.html




