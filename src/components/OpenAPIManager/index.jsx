import React from 'react';
import { observer } from 'mobx-react';
import ReactJson from 'react-json-view';

import AsyncAsset from '../../store/AsyncAsset';

const openAPIStore = new AsyncAsset('/openapi/', {
  host: 'http://localhost:6543',
});

@observer
class OpenAPIView extends React.Component {

  static desktopProps = {
    title: 'OpenAPIView',
  }

  componentDidMount = () => openAPIStore.load();

  render() {

    if (!openAPIStore.loaded) {
      return <div>loading...</div>;
    }

    return (
      <div>
        <ReactJson src={openAPIStore.data} />
      </div>
    );
  }

}

export default OpenAPIView;
