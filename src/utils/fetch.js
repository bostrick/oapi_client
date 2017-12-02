import yaml from 'js-yaml';

// hook to allow future customization
export const localFetch = fetch;

export const fetchJson = (url, config) => {
  const res = localFetch(url, config).then(resp => resp.json());
  return res;
};

export const fetchYaml = (url, config) =>
  localFetch(url, config)
    .then(resp => resp.text())
    .then(text => yaml.safeLoad(text));
