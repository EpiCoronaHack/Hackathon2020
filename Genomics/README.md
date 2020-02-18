## This is a forked repo for the genomics group collaboration

Please add your code, analyses, interpretation, and ideas here. Because this is a public repo, let's keep the data among us on Slack. 

## Learn about epidemic dynamics from viral sequences

About 80 sequences from the outbreak are available on GISAID, and this number grows almost daily. While this is a very small fraction of the total cases to date, these sequences can provide important information that relates to the estimation, modelling and forecasting efforts.

For example, there is very low genetic diversity among the outbreak sequences, with many sequences having 0, 1 or 2 single nucleotide differences from other outbreak sequences. If there had been many separate introductions into humans from an animal reservoir of the virus, we would expect more genetic diversity. 

If we know the rate of substitution (how long does it take for genetic variation to be acquired?) then we can use levels of diversity to estimate the time of the most recent common ancestor of the outbreak sequences. This sheds light on when the virus likely first emerged, or at least, when it first emerged and became the cause of the current outbreak. 

Viral sequences can also be used to infer the past effective population size using coalescent theory, and to estimate the basic reproduction number using simple branching process models. These estimates are performed in the Bayesian Evolutionary Analysis by Sampling Trees (BEAST) software. There are many BEAST tutoraials online (including the one linked below). 

Data will be supplied upon request. We cannot post GISAID viral sequences due the data sharing agreement with GISAID. 

## How to Perform Sequence Alignment on 2019-nCoV with MAFFT:

https://towardsdatascience.com/how-to-perform-sequence-alignment-on-2019-ncov-with-mafft-96c1944da8c6

## Phylodynamic Analysis of 2019-nCoV using BEAST 

http://virological.org/t/phylodynamic-analysis-90-genomes-12-feb-2020/356
