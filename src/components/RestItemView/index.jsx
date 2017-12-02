
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import ReactJson from 'react-json-view';
import Form from 'react-jsonschema-form';
import {
  Card, CardBlock, CardTitle, Table,
} from 'reactstrap';
import { toJS } from 'mobx';

@observer
class RestItemView extends React.Component {
  componentDidMount() {
    if (this.props.restItem.state !== 'loaded') {
      // this.props.restStore.load();
    }
  }

  render() {
    const ritem = this.props.restItem;
    const item = toJS(ritem.item);
    const schema = toJS(ritem.store.schema);

    if (ritem.state !== 'loaded') {
      return <p>loading...</p>;
    }

    return (
      <Card>
        <CardTitle> Item </CardTitle>
        <CardBlock>
          <Form schema={schema} formData={item} />
        </CardBlock>
      </Card>
    );
  }
}

RestItemView.propTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  restItem: PropTypes.object.isRequired,
};

RestItemView.contextTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  router: PropTypes.object.isRequired,
};

export default RestItemView;
