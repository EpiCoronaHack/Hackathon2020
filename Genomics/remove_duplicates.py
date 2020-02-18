from Bio import SeqIO
import re

fasta_file = "/Users/ivan/Documents/repos/Hackathon2020/Genomics/mers_only.fasta"

records = set()

for record in SeqIO.parse(fasta_file, 'fasta'):
    records.add(record.seq._data)

print(len(records))
