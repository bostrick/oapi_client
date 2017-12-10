import _ from 'lodash';
import React from 'react';
import { inject, observer, propTypes } from 'mobx-react';
import { Button } from 'reactstrap';

@inject('desktop') @observer
class Toolkit extends React.Component {

  static propTypes = {
    desktop: propTypes.observableObject.isRequired,
  };

  static desktopProps = {
    title: 'Toolkit',
    permenant: true,
  };

  addToDesktop = (event) => {
    const btn = event.target;
    this.props.desktop.add(btn.dataset.name);
  }

  render() {
    return (
      <div>
        {
          _.map(this.props.desktop.factoryNames, k => (
            <Button key={k} data-name={k} onClick={this.addToDesktop}>
              {k}
            </Button>
          ))
        }
      </div>
    );
  }
}

export default Toolkit;
