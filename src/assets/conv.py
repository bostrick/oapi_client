#!/usr/bin/python3

import csv
import yaml

fields = None
with open("country-codes.csv", encoding="utf-8") as f:
    reader = csv.reader(f)
    data = []
    for row in reader:
        if not fields:
            fields = row
        else:
            data.append(dict(zip(fields, row)))

with open("country-data.yaml", "w", encoding="utf-8") as f:
    f.write(yaml.dump(data, default_flow_style=False, allow_unicode=True))
