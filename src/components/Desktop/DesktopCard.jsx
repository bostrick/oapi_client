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
    children: PropTypes.element,
    desktopid: PropTypes.string.isRequired,
    desktop: MobxPropTypes.observableObject.isRequired,
  };

  static defaultProps = {
    title: 'I need a title',
    subtitle: '',
    children: (<CardText> I need content </CardText>),
  };

  constructor(props) {
    super(props);

    this.state = {
      iconified: false,
    };

  }

  handleIconify = () => {
    this.setState({ iconified: !this.state.iconified });
  }

  handleClose = () => {
    this.props.desktop.remove(this.props.desktopid);
  }

  render() {
    const { title, subtitle, children } = this.props;
    return (
      <Card>
        <CardHeader onClick={this.handleIconify}>

          <Button className="close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </Button>
          <Button className="close" onClick={this.handleIconify}>
            <span aria-hidden="true"><b>_</b></span>
          </Button>

          <CardTitle>
            { title }
          </CardTitle>
          <CardSubtitle>
            { subtitle }
          </CardSubtitle>
        </CardHeader>
        { this.state.iconified ? null : <CardBody>{ children }</CardBody> }
      </Card>
    );
  }
}

export default DesktopCard;
