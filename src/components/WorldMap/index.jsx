import _ from 'lodash';
import { Card, CardBlock } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import React from 'react';

import { observer } from 'mobx-react';
// import PropTypes from 'prop-types';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import { schemeCategory20 } from 'd3-scale';
// import { brighter, darker } from 'd3-color';
import { color } from 'd3-color';


// import CountryData from '../../store/CountryData';
import AsyncAsset from '../../store/AsyncAsset';

const geoData = new AsyncAsset('world-50m.json');

@observer
class WorldMap extends React.Component {

  componentWillMount() {
    geoData.load();
  }

  getRegionColor = (ldata, geo) => {

    if (_.isEmpty(ldata)) {
      return color(schemeCategory20[0]);
    }
    // const code = _.get(geo, 'properties.iso_a3');
    const code = _.get(geo, 'id');
    const linfo = _.get(ldata, code, {});
    const i = _.indexOf(this.cdata.regions, linfo.region);
    if (_.isNil(i)) {
      console.log('bad geo');
      console.log(geo);
      return color(schemeCategory20[0]);
    }
    return color(schemeCategory20[i % 20]);
  }

  render() {

    if (!geoData.loaded) {
      return <h6>loading...</h6>;
    }

    return (
      <div>
        <h1>World Map</h1>
        <Card>
          <CardBlock>

<ComposableMap
  projectionConfig={{
    scale: 205,
    rotation: [-11, 0, 0],
  }}
  width={980}
  height={551}
  style={{
    width: '100%',
    height: 'auto',
  }}
>
  <ZoomableGroup center={[0, 20]} disablePanning>
    <Geographies geography={geoData.data}>
      {(geographies, projection) => geographies.map(geography => geography.id !== 'ATA' && (
        <Geography
          key={geography.id}
          cacheId={geography.id}
          data-tip="hello"
          geography={geography}
          projection={projection}
          style={{
            default: {
              // fill: this.getRegionColor(ldata, geography),
              stroke: '#607D8B',
              strokeWidth: 0.75,
              outline: 'none',
            },
            hover: {
              // fill: this.getRegionColor(ldata, geography).brighter(),
              stroke: '#607D8B',
              strokeWidth: 0.75,
              outline: 'none',
            },
            pressed: {
              // fill: this.getRegionColor(ldata, geography).darker(),
              stroke: '#607D8B',
              strokeWidth: 0.75,
              outline: 'none',
            },
          }}
        />
      ))}
    </Geographies>
  </ZoomableGroup>
</ComposableMap>
            <ReactTooltip />

          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default WorldMap;
