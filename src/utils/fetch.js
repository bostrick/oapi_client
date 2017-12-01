import yaml from 'js-yaml';

export const fetchJson = (url, config) => {
  const res = fetch(url, config).then(resp => resp.json());
  return res;
};

export const fetchYaml = (url, config) =>
  fetch(url, config)
    .then(resp => resp.text())
    .then(text => yaml.safeLoad(text));
