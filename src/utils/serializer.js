

import yaml from 'js-yaml';

/* eslint no-unused-vars: "off" */
/* 'options' currently unused, but should be left for intention.... */

class JSONSerializer {
  loads = (text, options) => JSON.parse(text);
  dumps = (obj, options) => JSON.stringify(obj);
}

class YAMLSerializer {
  loads = (text, options) => yaml.safeLoad(text);
  dumps = (obj, options) => yaml.safeDump(obj);
}

const serializers = {
  json: new JSONSerializer(),
  yaml: new YAMLSerializer(),
};

const getSerializer = format => serializers[format];

export default getSerializer;
