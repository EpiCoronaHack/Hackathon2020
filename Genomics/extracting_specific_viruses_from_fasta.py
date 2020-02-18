from Bio import SeqIO
from random import sample
import re

N_SAMPLE = 97
fasta_file = "coronaviridae.total.genbank2fasta.uniq.0125.fasta"
fitler =

records_data = set()
records_full = []

for record in SeqIO.parse(fasta_file, 'fasta'):
    mers = re.search("Middle.*Homo_sapiens", record.id)
    if mers is not None:
        if record.seq._data not in records_data:
            records_data.add(record.seq._data)
            records_full.append(record)

sampled_records = sample(records_full, N_SAMPLE)

with open("reduced_mers.fasta", "w+") as output_handle:
    SeqIO.write(sampled_records, output_handle, "fasta")
