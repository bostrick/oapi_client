#!/usr/bin/python3

import yaml

with open("country_region_map.yaml") as f:
    data = yaml.load(f.read())

with open("country-data.yaml") as f:
    cdata = yaml.load(f.read())

attr_map = {
    'code_3': "ISO3166-1-Alpha-3",
    'continent': "Continent",
    'region_name': "Region Name",
    'sub_region_name': "Sub-region Name",
    'langauges': "Languages",
}

cmap = { c.get("ISO3166-1-Alpha-2"): c for c in cdata }
for d in data:
    for k,v in attr_map.items():
        if not d["code"] in cmap:
            print("missing code %s" % d["code"])
        d[k] = cmap.get(d["code"], {}).get(v)

with open("t.yaml", "w", encoding="utf-8") as f:
    f.write(yaml.dump(data, default_flow_style=False, allow_unicode=True))
