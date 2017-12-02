// import _ from 'lodash';
import { observable } from 'mobx';

class RestItemStore {
  @observable item = {};
  @observable state = 'init';

  constructor(store, item) {
    this.store = store;
    if (item) {
      this.setItem(item);
    }
  }

  setItem(obj) {
    this.item = obj;
    this.state = 'loaded';
  }
}

export default RestItemStore;
