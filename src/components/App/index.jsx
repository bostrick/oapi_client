
import _ from 'lodash';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DevTools from 'mobx-react-devtools';
import { Container } from 'reactstrap';

import Header from '../Header';
import Page from '../Page';

import RestListView from '../RestListView';
import RestItemView from '../RestItemView';
import RestStore from '../../store/reststore';

class App extends React.Component {

  constructor(props) {
    super(props);

    const restObjectNames = ['mailing'];
    this.baseUrl = 'http://localhost:6543';

    this.stores = {};
    _.each(restObjectNames, (key) => {
      this.stores[key] =
        new RestStore({ baseUrl: `${this.baseUrl}/openapi/${key}` });
    });

    this.list_views = {};

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

  render() {
    return (
      <BrowserRouter>
        <Container fluid>
          <Header />
          <Page />
          {/*
            <Route path="/mailing" component={this.getView} />
            <Route path="/mailing/:id" component={this.getItemView} />
          */}
          <DevTools />
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
