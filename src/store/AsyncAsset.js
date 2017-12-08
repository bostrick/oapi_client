import _ from 'lodash';
import { action, observable, computed, toJS } from 'mobx';
import FileSaver from 'file-saver';
// import { localFetch as fetch, fetchYaml, fetchJson } from '../utils/fetch';
import fetch from '../utils/fetch';
import getSerialzer from '../utils/serializer';

class AsyncAsset {

  baseUrl = '/static';
  @observable data = {};

  extensions = {
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml',
  };

  constructor(name) {
    this.name = name;
    const f = _.find(this.extensions, (v, k) => _.endsWith(this.name, k));
    this.serializer = getSerialzer(f || 'json');
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
    return fetch(u)
      .then(body => this.serializer.loads(body))
      .then(obj => this.data = obj);
  }

  download = () => {
    const text = this.serializer.dumps(toJS(this.data));
    FileSaver.saveAs(new Blob([text]), this.name);
  }

}

export default AsyncAsset;
