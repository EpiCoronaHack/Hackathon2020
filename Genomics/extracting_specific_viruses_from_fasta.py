from Bio import SeqIO
import re

fasta_file = "/Users/ivan/Downloads/coronaviridae.total.genbank2fasta.uniq.0125.fasta"

records = []

for record in SeqIO.parse(fasta_file, 'fasta'):
    mers = re.search("^Middle", record.id)
    if mers is not None:
        counter += 1
        records.append(record)

print(counter)