import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReactJson from 'react-json-view';
import { Card, CardBlock, CardTitle } from 'reactstrap';
import { toJS } from 'mobx';

// import OpenAPIState from '../../store/openapi';

@observer
class RestListView extends React.Component {
  constructor(props) {
    super(props);
    this.rs = props.restStore;
    this.schema = this.rs.schema;
    global.log.info('RestListView init');
    global.log.info(this);
  }

  componentDidMount() {
    if (this.rs.state !== 'loaded') {
      this.rs.load();
    }
  }

  render() {
    const items = toJS(this.rs.items);
    global.log.info({ items });

    if (this.rs.state !== 'loaded') {
      return <p>loading...</p>;
    }

    return (
      <Card>
        <CardTitle> Items </CardTitle>
        <CardBlock>
          <ReactJson src={this.rs.schema} />
          <ReactJson src={items} />
        </CardBlock>
      </Card>
    );
  }
}

RestListView.propTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  restStore: PropTypes.object.isRequired,
};

export default RestListView;
