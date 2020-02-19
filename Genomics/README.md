## Team Genomics

Please add your code, analyses, interpretation, and ideas here. Because this is a public repo, please do not share the SARS-CoV-2 sequences that were obtained from GISAID on this github.

## Objectives

Because there are so few sequences available from the COVID-19 epidemic relative to the prevalence, we are hesitant to investigate epidemiological parameters using this data alone. Rather, by placing SARS-CoV-2 in context within the greater Coronaviridae family, we hope to provide insights into how this outbreak compares to other zoonotic coronaviruses.

Our goals are thus to compare the phylogenetic structure and variable genomic motifs between SARS-CoV-2, MERS-CoV, and SARS-CoV. By comparing the tree structure between these epidemics, we will be able to test whether SARS-CoV-2 more closely resembles MERS-CoV or SARS-CoV in its branching pattern, which is a product of both viral transmission and sampling of the epidemic (though they are difficult to disentangle). We proposed to generate trees of these conoravirus epidemics using different tree-building algorithms so that we could compare the evolutionary dynamics between them. As an complementary analysis, we wanted to look at variable regions within the gene coding for the spike protein to evaluate patterns common to zoonotic coronaviruses. 

## Methodology
* We pulled all available sequences from GISAID for SARS-CoV-2 (n=118 on February 18) that we then pared down based on outliers in a root-to-tip temporal signal analysis in IQ tree (n=97)
* We downloaded all available coronaviridae sequences (n=2925) from GenBank, from which we identified all SARS-CoV (n=182) and MERS-CoV (n=513) sequences regardless of host species
* The tree comparison metrics we are interested in require that trees being compared have the same number of tips, therefore we sampled the most recent 120 sequences for SARS and MERS (purposely overshooting the 97 for SARS-CoV-2 to allow for removal of the outliers)
* Sequences for each epidemic were separately aligned in mafft (--auto)
* The host, viral "species", sampling date, and sequence length were summarized for each of the alignments
* Alignments were fed into 1) PhyML, 2) FastTree, 3) RAxML, 4) BEAST, 5) IQ tree
* For BEAST, characters in the alignment that were non-variable were removed to reduce computational time. We applied a coalescent constant size tree model, HKY substitution model, strict clock model (mean=0.001), and ran it for 50M chains with a 10% burn-in. A most credible clade (MCC) tree was generated to summarize the posterior probability distribution of trees. 
* Having generated 1 tree for each of the three epidemics for each of the 5 tree-building methods (15 trees total), we then applied a tree-defining polynomial (R package Treenomial) method to quantify/describe each of the tree structures
* The similarity of the trees was then compared in a 1) n by n matrix heatmap, 2) a dimensionality reduction plot (either t-SNE or MDS)
* We used these statistics and plots to test the hypothesis that SARS-CoV-2 is more similar to SARS-CoV than it is to MERS-CoV
* We also wanted to test the hypothesis that these relationships would be consistent within any of the 5 tree building algorithms
* Finally, we were interested to see if the tree structure was significantly different between the 5 algorithms for a given epidemic/alignment

