#!/usr/bin/python3

import yaml

fields = None
#with open("country_region_map.yaml", encoding="utf-8") as f:
with open("country_region_map.yaml") as f:
    data = yaml.load(f.read())

with open("t.yaml", "w", encoding="utf-8") as f:
    f.write(yaml.dump(data, default_flow_style=False, allow_unicode=True))
