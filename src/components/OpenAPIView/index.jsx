import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import ReactJson from 'react-json-view';
import { Card, CardBlock, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { toJS } from 'mobx';

// import OpenAPIState from '../../store/openapi';

@observer
class OpenAPIView extends React.Component {
  render() {
    const api = toJS(this.props.openApiStore.content);
    global.log.info('api');
    global.log.info({ api });

    if (Object.keys(api).length === 0) {
      return <p>loading...</p>;
    }

    return (
      <Card>
        <CardTitle> {api.info.title} </CardTitle>
        <CardSubtitle> {api.info.description} </CardSubtitle>
        <CardBlock>
          <ReactJson src={api} />
        </CardBlock>
      </Card>
    );
  }
}

OpenAPIView.propTypes = {
  // openApiStore: PropTypes.instanceOf(OpenAPIState).isRequired,
  /* eslint react/forbid-prop-types: off */
  openApiStore: PropTypes.object.isRequired,
};

export default OpenAPIView;
