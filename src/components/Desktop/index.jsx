import React from 'react';
import { observer, inject, PropTypes } from 'mobx-react';
import { Col } from 'reactstrap';

@inject('desktop') @observer
class Desktop extends React.Component {

  static propTypes = {
    desktop: PropTypes.observableObject.isRequired,
  }

  componentDidMount = () => {
    const desk = this.props.desktop;

    if (desk.isEmtpy) {

      global.log.debug('adding welcome card');
      const elem = <p><b>hello world from {JSON.stringify(this.props)}</b></p>;
      const opts = {
        title: 'Welcome!',
        subtitle: 'Add some content...',
      };

      desk.add('welcome', elem, opts);
    }
  };

  render() {
    return (
      <Col>
        <div className="d-flex p-2">
          {this.props.desktop.components}
        </div>
      </Col>
    );
  }
}

export default Desktop;
