import React from 'react';
import { inject, observer, PropTypes as MobxPropTypes } from 'mobx-react';
import {
  Card, CardHeader, CardBody, CardText,
  CardTitle, CardSubtitle,
  Button,
} from 'reactstrap';
import PropTypes from 'prop-types';

@inject('desktop') @observer
class DesktopCard extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    content: PropTypes.element,
    desktopid: PropTypes.string.isRequired,
    desktop: MobxPropTypes.observableObject.isRequired,
  };

  static defaultProps = {
    title: 'I need a title',
    subtitle: '',
    content: (<CardText> I need content </CardText>),
  };

  handleClose = () => {
    this.props.desktop.remove(this.props.desktopid);
  }

  render() {
    const { title, subtitle, content } = this.props;
    return (
      <Card>
        <CardHeader>
          <Button className="close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
          <CardTitle>
            { title }
          </CardTitle>
          <CardSubtitle>
            { subtitle }
          </CardSubtitle>
        </CardHeader>
        <CardBody>
          { content }
        </CardBody>
      </Card>
    );
  }
}

export default DesktopCard;
