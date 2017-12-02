import _ from 'lodash';
import { action, observable, computed } from 'mobx';
import { localFetch as fetch, fetchYaml, fetchJson } from '../utils/fetch';

class AsyncAsset {

  baseUrl = '/static';
  @observable data = {};

  extensions = {
    '.json': fetchJson,
    '.yaml': fetchYaml,
  }
  dfltFetch = fetch;

  constructor(name) {
    this.name = name;
  }

  @computed get loaded() {
    return !(_.isEmpty(this.data));
  }

  get fetcher() {
    const f = _.find(this.extensions, (v, k) => _.endsWith(this.name, k));
    return _.isNil(f) ? this.dfltFetch : f;
  }

  @action
  load = () => {
    if (_.isEmpty(this.data)) {
      this.forceLoad();
    }
  }

  @action
  forceLoad = () => {
    const u = `${this.baseUrl}/${this.name}`;
    const f = this.fetcher;
    return f(u).then(obj => this.data = obj);
  }

}

export default AsyncAsset;
