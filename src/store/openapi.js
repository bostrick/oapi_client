import { observable, autorun } from 'mobx';
import 'whatwg-fetch';

class OpenAPIStore {
  @observable baseUrl = 'http://localhost:6543/openapi/';
  @observable content = {};

  constructor() {
    autorun(() => log.debug(`loading ${this.baseUrl}`));
    this.load();
  }

  load() {
    fetch(this.baseUrl)
      .then(resp => resp.json())
      .then(data => this.content = data);
  }
}

const openAPIStore = new OpenAPIStore();
export default openAPIStore;
