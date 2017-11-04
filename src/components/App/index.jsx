
import React from 'react';
import PropTypes from 'prop-types';

import Page from '../Page';
import Header from '../NavBar';
import Dashboard from '../Dashboard';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Page>
          <Dashboard>
            <h1> Hello World </h1>
          </Dashboard>
        </Page>
      </div>
    );
  }
}
// App.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default App;
