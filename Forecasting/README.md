# Forecasting
This theme overlaps with the Estimation and Modelling themes quite heavily.
## Introduction
Mathematical models of the nCov outbreak can be used to predict future outcomes and assess the feasibility of control measures. Below we give a few examples of how forecasting has been done by researchers. Potential projects could include updating the models based on more current data, including more complex or specific control measures, evaluating the predictions made based on current data, etc. 

## Some Examples
[Hellewell et al.](https://www.medrxiv.org/content/10.1101/2020.02.08.20021162v1.full.pdf) develop a branching process model which they use to predict the effectiveness of contact tracing and case isolation. Their code can be found [here](https://github.com/epiforecasts/ringbp). This analysis could be repeated with more up-to-date parameter estimates, more complex control scenarios etc. 
  
[De Salazar PM et al.](https://www.medrxiv.org/content/medrxiv/early/2020/02/05/2020.02.04.20020495.full.pdf) develop a model for imported cases based on estimated air travel volume. They use the analyses to predict which countries may be underreporting case counts. This model would be well-suited to evaluate control measures (either existing or proposed). Their R code is available [here](https://github.com/c2-d2/cov19flightimport). Care should be taken to only include imported cases in this analysis.
  
[Kucharaski et al.](https://www.medrxiv.org/content/medrxiv/early/2020/02/02/2020.01.31.20019901.full.pdf) have investigated the potential for new outbreaks to become established outside of Wuhan. They develop a stochastic model, although an analgaous deterministic model could be developped. The code for this analysis is available [here](https://github.com/adamkucharski/2020-ncov).
  
[Wu et al.](https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(20)30260-9/fulltext) perform some preliminary forecasting predicting the spread of nCov to other major Chinese cities. More discussion on this paper is located in the [Modelling](https://github.com/EpiCoronaHack/Hackathon2020/tree/master/Modelling) section. One idea could be to assess the accuracy of these predictions, or repeat them with updated data. 


