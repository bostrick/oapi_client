import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';

@observer
class Counter extends React.Component {

  get lastItem() {
    return _.nth(this.props.store.items, -1);
  }

  get allNames() {
    //const names = _.map(this.props.store.items, v => <li key={v.name}>{v.name}</li>);
    return _.map(this.props.store.items, v => <li key={v.name}>{v.name}</li>);
  }

  render() {
    return (
      <div>
        <ul>
          {this.allNames}
        </ul>
      </div>
    );
  }
}

export default Counter;
