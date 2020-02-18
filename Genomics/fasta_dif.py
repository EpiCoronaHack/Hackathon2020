from Bio import SeqIO
import re

fasta_file1 = "/Users/ivan/Downloads/sequence.fasta"
fasta_file2 = "/Users/ivan/Downloads/coronaviridae.total.genbank2fasta.uniq.0125.fasta"

idlist1 = []
idlist2 = []

for record in SeqIO.parse(fasta_file1, 'fasta'):
    idlist1.append(record.id)

for record in SeqIO.parse(fasta_file2, 'fasta'):
    accession_num = re.search("__([A-Z0-9]*\.[0-9])__|__([A-Z0-9]*)__", record.id)
    if accession_num is not None:
        idlist2.append(accession_num.group(1))
    else:
        print("error on: " + record.id)

difference = list(set(idlist1) - set(idlist2))
print(difference)
print(len(difference))