import _ from 'lodash';
import { observable } from 'mobx';
import { fetchJson } from '../utils/fetch';
import RestItemStore from './RestItemStore';

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

  getIdAttr() {
    return _.get(this.schema, 'meta.id_attr', 'doc_id');
  }

  getItem(itemid) {
    const idattr = this.getIdAttr();
    const data = _.find(this.items, item => _.get(item, idattr) === itemid);
    return new RestItemStore(this, data);
  }
}

export default RestStore;
