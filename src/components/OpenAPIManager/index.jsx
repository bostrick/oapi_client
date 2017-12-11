import React from 'react';
import { observer } from 'mobx-react';
import ReactJson from 'react-json-view';
import {
  Nav, NavItem, NavLink,
  TabContent, TabPane,
  Row, Col,
  Card, CardTitle, CardText, Button,
} from 'reactstrap';
import classnames from 'classnames';

import OpenAPIInfoPane from './InfoPane';
import AsyncAsset from '../../store/AsyncAsset';

const openAPIStore = new AsyncAsset('/openapi/', {
  host: 'http://localhost:6543',
});


@observer
class OpenAPIView extends React.Component {

  static desktopProps = {
    title: 'OpenAPIView',
  }

  constructor(props) {
    super(props);

    this.state = {
      activeTab: '1',
    };
  }


  componentDidMount = () => openAPIStore.load();

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    if (!openAPIStore.loaded) {
      return <div>loading...</div>;
    }

    return (

<div>
  <Nav tabs>
    <NavItem>
      <NavLink
        className={classnames({ active: this.state.activeTab === '1' })}
        onClick={() => { this.toggle('1'); }}
      >
        OpenAPI
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={classnames({ active: this.state.activeTab === '2' })}
        onClick={() => { this.toggle('2'); }}
      >
        JSON
      </NavLink>
    </NavItem>
  </Nav>
  <TabContent activeTab={this.state.activeTab}>
    <TabPane tabId="1">
      <Row>
        <Col sm="12">
          <OpenAPIInfoPane api={openAPIStore.data} />
        </Col>
      </Row>
    </TabPane>
    <TabPane tabId="2">
      <Row>
        <Col sm="12">
          <Card className="m-2">
            <ReactJson src={openAPIStore.data} />
          </Card>
        </Col>
      </Row>
    </TabPane>
  </TabContent>
</div>

    );
  }

}

export default OpenAPIView;
