import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { inject, observer, PropTypes as rPropTypes } from 'mobx-react';
import {
  Card, CardHeader, CardBody,
  CardTitle, CardSubtitle, CardText,
  Button,
} from 'reactstrap';
// import classnames from 'classnames';

@inject('desktop') @observer
class OpenAPIInfoPane extends React.Component {

  static propTypes = {
    api: PropTypes.object.isRequired,
    desktop: rPropTypes.observableObject.isRequired,
  }

  static desktopProps = {
    title: 'OpenAPIView',
  }

  handleShowItemList = (e) => {
    const btn = e.target;
    console.log(btn.dataset);
    console.log(this.props.desktop);
  }

  renderPath = (def, path) => {

    const parts = _.split(path, '/');
    if (parts.length === 2) {
      const p = parts[1];
      return (
        <Button key={p} data-path={path} onClick={this.handleShowItemList}>
          {p}
        </Button>
      );
    }
    return null;
  }

  render() {
    const { api } = this.props;
    const info = _.get(api, 'info', {});
    return (
      <Card className="m-2">

        <CardHeader>
          <CardTitle>
            {_.get(info, 'title', 'unnamed OpenAPI')}
          </CardTitle>
          <CardSubtitle>
            {_.get(info, 'description', '')}
          </CardSubtitle>
          <CardText className="text-muted">
            {_.get(info, 'contact.name')}
            {_.get(info, 'contact.email')}
            {_.get(info, 'contact.url')}
          </CardText>
        </CardHeader>

        <CardBody>
          { _.map(_.get(api, 'paths', {}), this.renderPath)}
        </CardBody>
      </Card>
    );
  }

}

export default OpenAPIInfoPane;
