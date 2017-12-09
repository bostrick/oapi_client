import _ from 'lodash';
import { action, computed, observable } from 'mobx';

class DesktopStore {

  @observable items = [];
  @observable generation = 0;

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
    global.log.debug(`push ${name}`);
    this.items.push({ name, component });
    this.generation += 1;
  }

  @action
  remove = (name) => {
    global.log.debug(`remove ${name}`);
    _.remove(this.items, v => v.name === name);
    this.generation += 1;
  }

}

// export const desktopStore = new DesktopStore();
export default DesktopStore;
