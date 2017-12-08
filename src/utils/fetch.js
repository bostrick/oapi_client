import yaml from 'js-yaml';

const { log } = global;

export const localFetch = (url, config) => {
  log.debug(`fetching ${url} ${config}`);
  return fetch(url, config).then((resp) => {
    log.debug(`response ${resp.statusText} ${url}`);
    if (resp.ok) {
      return resp.text();
    }
    log.warn(`bad response for ${url}`);
    return '';
  });
};

export const fetchJson = (url, config) => {
  log.warn('deprecated fetchJson');
  return localFetch(url, config)
    .then(text => JSON.parse(text));
};

export const fetchYaml = (url, config) => {
  log.warn('deprecated fetchYaml');
  return localFetch(url, config)
    .then(resp => resp.text())
    .then(text => yaml.safeLoad(text));
};

export default localFetch;
