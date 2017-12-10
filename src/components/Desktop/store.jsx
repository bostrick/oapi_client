import _ from 'lodash';
import React from 'react';
import { action, computed, observable } from 'mobx';

import DesktopCard from './DesktopCard';

class DesktopStore {

  @observable items = [];
  @observable factoryRegistry = {};

  @computed
  get isEmtpy() { return !this.items.length; }

  @computed
  get nameMap() {
    return _.keyBy(this.items, 'name');
  }

  @computed
  get factoryNames() {
    return _.keys(this.factoryRegistry);
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
  registerFactory = (name, factory, config) => {

    if (_.includes(this.factoryNames, name)) {
      global.log.info(`${name} already on factory`);
      return;
    }

    global.log.debug(`adding factory ${name}`);
    this.factoryRegistry[name] = { factory, config };
  };

  @action
  add = (name, child, config) => {

    if (_.includes(this.names, name)) {
      global.log.info(`${name} already on destkop`);
      return;
    }

    let elem = child;
    const elemConfig = _.assign({}, config);

    if (_.isNil(elem)) {
      const item = this.factoryRegistry[name];
      if (!item) {
        global.log.error(`no registered factory ${name}`);
        return;
      }
      // elem = item.factory();
      elem = item.factory();
      _.assign(elemConfig, item.config);
    }

    const props = _.assign({}, elemConfig, { desktopid: name, key: name });
    const component = (
      <DesktopCard {...props}>
        {elem}
      </DesktopCard>
    );
    global.log.debug(`push ${name}`);
    this.items.push({ name, component });
  }

  @action
  remove = (name) => {
    global.log.debug(`remove ${name}`);
    _.remove(this.items, v => v.name === name);
  }

}

// export const desktopStore = new DesktopStore();
export default DesktopStore;
