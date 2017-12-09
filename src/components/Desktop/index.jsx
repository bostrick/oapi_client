import _ from 'lodash';
import React from 'react';
import { observer, Provider, PropTypes } from 'mobx-react';
import { Col } from 'reactstrap';
import DesktopCard from '../DesktopCard';
// import { desktopStore } from './store';

@observer
class Desktop extends React.Component {

  static propTypes = {
    store: PropTypes.observableObject.isRequired,
  }

  componentDidMount = () => {
    const ds = this.props.store;
    if (ds.isEmtpy) {
      global.log.debug('adding welcome card');
      const elem = <p><b>hello world from {JSON.stringify(this.props)}</b></p>;
      const card = (
        <DesktopCard
          key="welcome"
          id="welcome"
          desktopid="welcome"
          title="Welcome!"
          subtitle="Add some content..."
          content={elem}
        />);
      ds.add('welcome', card);
    }
  };

  render() {
    return (
      <Provider desktop={this.props.store}>
        <Col>
          <div className="d-flex p-2">
            {_.map(this.props.store.items, i => i.component)}
          </div>
        </Col>
      </Provider>
    );
  }
}

export default Desktop;
