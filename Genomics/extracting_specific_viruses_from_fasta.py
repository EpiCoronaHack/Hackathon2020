from Bio import SeqIO
from random import sample
import re

def do_add(s, x):
  l = len(s)
  s.add(x)
  return len(s) != l

N_SAMPLE = 97
fasta_file = "coronaviridae.total.genbank2fasta.uniq.0125.fasta"

records_data = set()
records_full = []

for record in SeqIO.parse(fasta_file, 'fasta'):
    mers = re.search("Middle.*Homo_sapiens", record.id)
    if mers is not None:
        if do_add(records_data, record.seq._data):
            records_full.append(record)

sampled_records = sample(records_full, N_SAMPLE)

with open("reduced_mers.fasta", "w+") as output_handle:
    SeqIO.write(sampled_records, output_handle, "fasta")
