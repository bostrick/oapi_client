import _ from 'lodash';
import { observable } from 'mobx';

const fetchJson = (url, config) => {
  const res = fetch(url, config).then(resp => resp.json());
  return res;
};

class RestStore {
  @observable schema = {};
  @observable items = [];
  @observable state = 'init';

  dfltConfig = {
    baseUrl: 'http://localhost/api',
  }

  constructor(config) {
    this.config = _.assign(this.dfltConfig, config);
    global.log.debug('init store');
    global.log.debug({ config: this.config });
    this.loadSchema();
  }

  loadSchema = () => {
    const u = `${this.config.baseUrl}/@@schema`;
    fetchJson(u).then(data => this.schema = data);
    global.log.info('schema');
    global.log.info(this.schema);
  };

  load() {
    global.log.debug(`loading ${this.config.baseUrl}`);
    this.state = 'loading';
    fetch(this.config.baseUrl)
      .then(resp => resp.json())
      .then((data) => {
        this.items = data;
        this.state = 'loaded';
      });
  }
}

export default RestStore;
