import _ from 'lodash';
import { action, computed, observable } from 'mobx';

class DesktopStore {

  @observable items = [];

  @computed
  get isEmtpy() { return !this.items.length; }

  @computed
  get nameMap() {
    return _.keyBy(this.items, 'name');
  }

  @computed
  get names() {
    return _.keys(this.nameMap);
  }

  @computed
  get components() {
    return _.map(this.items, v => v.component);
  }

  @action
  add = (name, component) => {
    global.log.info(`push ${name}`);
    this.items.push({ name, component });
  }

  @action
  remove = (name) => {
    this.items = _.filter(this.items, v => v.name === name);
  }

}

const appStore = new DesktopStore();
export default appStore;
