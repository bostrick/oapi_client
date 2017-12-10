import _ from 'lodash';
import { action, computed, observable } from 'mobx';

export class Registry {

  @observable items = {};
  @observable generation = 0;

  @computed get isEmtpy() { return _.empty(this.items); }
  @computed get keys() { return _.keys(this.items); }

  get = name => _.get(this.items, name);

  @action add = (name, item) => {
    if (_.includes(this.names, name)) {
      global.log.info(`${name} already registered`);
      return;
    }
    global.log.debug(`add ${name} ${item}`);
    this.items[name] = item;
    this.generation += 1;
  }

  @action remove = (name) => {
    global.log.debug(`remove ${name}`);
    if (_.unset(this.items, name)) { this.generation += 1; }
  }

}

export default Registry;
