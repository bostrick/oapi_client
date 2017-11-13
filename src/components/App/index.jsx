
import _ from 'lodash';
import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import Page from '../Page';
import Header from '../NavBar';
import Dashboard from '../Dashboard';
import Mailings from '../Mailings';

import OpenAPIView from '../OpenAPIView';
import openAPIStore from '../../store/openapi';

import RestListView from '../RestListView';
import RestStore from '../../store/reststore';


class App extends React.Component {
  constructor(props) {
    super(props);

    const restObjectNames = ['mailing'];
    this.baseUrl = 'http://localhost:6543';

    this.stores = {
      openapi: openAPIStore,
    };
    _.each(restObjectNames, (key) => {
      this.stores[key] =
        new RestStore({ baseUrl: `${this.baseUrl}/openapi/${key}` });
    });

    this.views = {
      openapi: <OpenAPIView openApiStore={this.stores.openapi} />,
    };
    _.each(restObjectNames, (key) => {
      this.views[key] =
        <RestListView restStore={this.stores[key]} />;
    });
  }

  getView = (context) => {
    const name = context.match.path.slice(1);
    global.log.info(`looking for match ${name}`);

    const view = _.get(this.views, name);
    if (view) {
      return view;
    }

    global.log.info('miss');
    return undefined;
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Page>
            <Dashboard>
              <Route path="/openapi" component={this.getView} />
              <Route path="/mailing" component={this.getView} />
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
