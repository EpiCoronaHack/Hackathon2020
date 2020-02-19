from Bio import SeqIO
from random import sample
import collections
import time
import re

class Counter(object):
    value = 0

def do_add(s, x):
    l = len(s)
    s.add(x)
    return len(s) != l

def to_integer(t):
    Counter.value += 1
    return 10000000*t.tm_year + 10000*t.tm_yday + Counter.value

N_SAMPLE = 120
fasta_file = "/Users/ivan/Downloads/coronaviridae.total.genbank2fasta.uniq.0125.fasta"

records_data = set()
records_full = {}

for record in SeqIO.parse(fasta_file, 'fasta'):
    #virus = re.search("^Middle.*([12][90][0-9]{2}-[0-9]{2}-[0-9]{2})", record.id)
    virus = re.search("^SARS.*([12][90][0-9]{2}-[0-9]{2}-[0-9]{2})", record.id)
    if virus is not None:
        if 'like' not in record.seq._data:
            if do_add(records_data, record.seq._data):
                dt = time.strptime(virus.group(1), "%Y-%m-%d")
                dt_int = to_integer(dt)
                records_full[dt_int] = record
            else:
                print("Duplicate")
        else:
            print("Virus-like but not the same")

sorted_records = collections.OrderedDict(sorted(records_full.items()))
sorted_records_list = [*sorted_records.values()]
print(len(sorted_records_list))

#random 120
#sampled_records = sample(sorted_records_list, N_SAMPLE)

#first 120
#sampled_records = sorted_records_list[:N_SAMPLE]

#last 120
sampled_records = sorted_records_list[-N_SAMPLE:]

#with open("reduced_mers.fasta", "w+") as output_handle:
with open("reduced_sars.fasta", "w+") as output_handle:
    SeqIO.write(sampled_records, output_handle, "fasta")
