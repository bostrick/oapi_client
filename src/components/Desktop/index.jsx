import _ from 'lodash';
import React from 'react';
import { observer } from 'mobx-react';
import { Col } from 'reactstrap';
import DesktopCard from '../DesktopCard';
import appDesktopStore from './store';

@observer
class Desktop extends React.Component {

  componentWillMount = () => {
    const ds = appDesktopStore;
    global.log.warn(ds.items);
    if (ds.isEmtpy) {
      global.log.debug('adding welcome card');
      const elem = <p><b>hello world from {JSON.stringify(this.props)}</b></p>;
      const card = (
        <DesktopCard
          key="welcome"
          title="Welcome!"
          subtitle="Add some content..."
          content={elem}
        />);
      ds.add('welcome', card);
    }

  };

  getItems = () => {
    const ds = appDesktopStore;
    return ds.components;
  };

  render() {
    return (
      <Col>
        <div className="d-flex">
          {this.getItems()}
        </div>
      </Col>
    );
  }
}

export default Desktop;
