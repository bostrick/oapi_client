
import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import Page from '../Page';
import Header from '../NavBar';
import Dashboard from '../Dashboard';
import Mailings from '../Mailings';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Page>
            <Dashboard>
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
