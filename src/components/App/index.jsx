
import _ from 'lodash';
import React from 'react';
// import PropTypes from 'prop-types';
import { BrowserRouter, Route } from 'react-router-dom';

import Page from '../Page';
import Header from '../NavBar';
import Dashboard from '../Dashboard';

import OpenAPIView from '../OpenAPIView';
import openAPIStore from '../../store/openapi';

import RestListView from '../RestListView';
import RestItemView from '../RestItemView';
import RestStore from '../../store/reststore';
import WorldMap from '../WorldMap';


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

    this.list_views = {
      openapi: <OpenAPIView openApiStore={this.stores.openapi} />,
    };

    _.each(restObjectNames, (key) => {
      this.list_views[key] = <RestListView restStore={this.stores[key]} />;
    });
  }

  getView = (context) => {
    const name = context.match.path.slice(1);
    global.log.info(`looking for match ${name}`);
    const view = _.get(this.list_views, name);
    return view;
  }

  getItemView = (context) => {
    const path = _.get(context, 'match.path');
    const name = _.split(path, '/')[1];
    const store = _.get(this.stores, name);
    const item = store.getItem(_.get(context, 'match.params.id'));
    return <RestItemView restItem={item} />;
  }

  getWorldMap = () => <WorldMap />;

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Page>
            <Dashboard>
              <Route path="/openapi" component={this.getView} />
              <Route path="/mailing" component={this.getView} />
              <Route path="/mailing/:id" component={this.getItemView} />
            <Route path="/worldmap" component={this.getWorldMap} />
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
