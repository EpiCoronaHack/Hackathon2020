# Model the Outbreak

This theme overlaps with estimation quite heavily, and with forecasting, because both of those themes use models. 

## Introduction

Many groups have used models to simulate the outbreak, in part to confirm that it is (or was, up to about the 23 Jan) in an exponential growth phase, and to determine the basic reproduction number: the expected number of cases a new case will infect in a fully susceptible population. 

Here are a few of the links and a description of what the papers did. 

## The simplest model

If you have estimated the duration of the infectious period (let's call it D) and you think that your outbreak is in an exponential growth phase, then you can model the number of cases as N(t)= N(0) exp((R0-1)(t/D)). Then, you can fit this model to case count data, if you have them (and if you trust them).  This requires an estimate of D, of course, and knowledge of when the first case happened (or at least, a time, 0, when we know the number of cases). 

## Some early models of this outbreak, where code is available or feasible to write

This section particularly focuses on models that estimate R0 (so this is also estimation, but it is here because it is based on mathematical modelling as opposed to mainly statistical modelling). 

Liu et al https://www.biorxiv.org/content/10.1101/2020.01.25.919787v1.full.pdf
Uses confirmed cases to Jan 23, then additional data; assumes SARS generation time (could be updated!) 
This analysis is based on line list data -- data in which each row is a case. This would be an interesting one to repeat using new line list data. The model is straightforward enough to code. Note that I think equation 2-2 should read t_i, not t_1. 

Riou and Althaus https://www.biorxiv.org/content/10.1101/2020.01.23.917351v1: Stochastic simulation, keeping those that look like the data in the sense of being able to obtain the correct number of cases by the correct date. This analysis could be re-done now that there is more data. Code is available. 

Read et al https://www.medrxiv.org/content/10.1101/2020.01.23.20018549v2
Deterministic SEIR model, within and between Chinese cities.
Code is available but the analysis requires airplane data from OAG traffic analyser. It might be possible to obtain data like that from wechat using APIs, or from other sources (let us know if you'd be interested to do this). Historical flight data is also available from [this EcoHealth Alliance app](https://flirt.eha.io/), where it can be downloaded for free, but will need to be adjusted for non-full flights. Possibilities for extension include further adjustment of flight estimates for Lunar new year, and inclusion of rail and road travel estimates (to the best of our knowledge, no one has considered this so far). 

Wu et al, Lancet: https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30260-9/fulltext#sec1
These authors fit their model to international cases, assuming that these would be detected (while cases within Wuhan might not be - without a specific diagnostic test it is hard to know, and even with one, it is challenging to test large numbers of people). 
We digitized the data in the supplement and implemented this model as best we could - see the Rmd file and associated html. 
If you believe this model it would give estimates of the case count, portion of cases with symptoms, we could adapt it to take noise in the data into account, and more. However it seems to need a higher R0 than most other estimates. 

Simon Frost has collected references that estimate R0: https://docs.google.com/spreadsheets/d/1QP5vM62ctnMRYdkQ4J5IqaOmB3hISGvYqCvnB8rBmNY/edit#gid=0 (includes the above and more) 

Imperial College London's MRC Centre for Outbreak analysis report 3: https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-2019-nCoV-transmissibility.pdf
They also used stochastic simulation, and case count data. This approach could be re-done in light of new data. Their approach could also be extended as a forecasting tool - we could investigate how well what they predicted in the days following their report matched reality. We may need to consider how this would have been impacted by changes in public activity, and could the model be adapted to reflect this?

[Imperial College London's MRC Centre for Outbreak analysis reports 1 and 2](https://www.imperial.ac.uk/media/imperial-college/medicine/sph/ide/gida-fellowships/Imperial-2019-nCoV-transmissibility.pdf). These reports investigate the under-reporting of nCoV cases in Wuhan city. Using a probabilistic approach, they infer the 'true' number of nCoV cases within Wuhan City that may have occurred by 2 given dates, by assuming the number of cases detected outside China is fully observed. The only data required is that included in the report. It would be interesting to explore and test their assumptions, or to create more up-to-date estimates using recent case count data. We began an implemenation of these 3 Imperial College reports in R - see the Rmd and html files in this folder (as well as the warnings within of their accuracy).

[Quilty et al, Eurosurveillance](https://www.eurosurveillance.org/content/10.2807/1560-7917.ES.2020.25.5.2000080#r9) estimate the effectiveness of airport screening at detecting travellers infected with nCoV, by stochastically simulating infected travellers. Their approach is coded up in a [Shiny app](https://cmmid-lshtm.shinyapps.io/traveller_screening/), the code for which is available [on their GutHub repo](https://github.com/bquilty25/airport_screening). 

## Note:
To view the .html analysis file in this folder, append the web address with http://htmlpreview.github.com/? i.e. go to http://htmlpreview.github.io/?https://github.com/EpiCoronaHack/Hackathon2020/blob/master/Modelling/cc_Wuetal.html








