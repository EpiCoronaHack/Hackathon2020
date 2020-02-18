from Bio import SeqIO
import re

fasta_file = "/Users/ivan/Downloads/coronaviridae.total.genbank2fasta.uniq.0125.fasta"

records = []

for record in SeqIO.parse(fasta_file, 'fasta'):
    mers = re.search("^Middle", record.id)
    if mers is not None:
        records.append(record)

with open("mers_only.fasta", "w") as output_handle:
    SeqIO.write(records, output_handle, "fasta")