
import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import Page from '../Page';
import Header from '../NavBar';
import Dashboard from '../Dashboard';
import Mailings from '../Mailings';
import OpenAPIView from '../OpenAPIView';
import openAPIStore from '../../store/openapi';

class App extends React.Component {
  getOav() {
    return <OpenAPIView openApiStore={openAPIStore} />;
  }


  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Page>
            <Dashboard>
              <Route path="/openapi" component={this.getOav} />
              <Route path="/mailings" component={Mailings} />
            </Dashboard>
          </Page>
        </div>
      </BrowserRouter>
    );
  }
}
// App.propTypes = {
//   children: PropTypes.node.isRequired,
// };


export default App;
