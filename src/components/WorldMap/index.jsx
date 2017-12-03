import _ from 'lodash';
import { Card, CardBlock } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import React from 'react';

import { observer } from 'mobx-react';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import { schemeCategory20 } from 'd3-scale';
import { color } from 'd3-color';

import AsyncAsset from '../../store/AsyncAsset';

class Regions extends AsyncAsset {
  get names() {
    return _.map(this.data, obj => obj.name);
  }
}

class LabData extends AsyncAsset {
  get regionMap() {
    return _.keyBy(this.data, 'code_3');
  }
}

const geoData = new AsyncAsset('world-50m.json');
const labData = new LabData('labenv_region_map.yaml');
const regions = new Regions('regions.yaml');

@observer
class WorldMap extends React.Component {

  componentWillMount() {
    geoData.load();
    labData.load();
    regions.load();
  }

  getGeographyStyle(geo, rmap) {

    const code3 = _.get(geo, 'id', 'unk');
    const rdata = _.get(rmap, code3, 'unknown');
    const regionIdx = _.indexOf(regions.names, rdata.region);
    // account for -1
    const geoColor = color(schemeCategory20[(regionIdx + 20) % 20]);

    return {
      default: {
        fill: geoColor,
        stroke: '#607D8B',
        strokeWidth: 0.75,
        outline: 'none',
      },
      hover: {
        fill: geoColor.brighter(),
        stroke: '#607D8B',
        strokeWidth: 0.75,
        outline: 'none',
      },
      pressed: {
        fill: geoColor.darker(),
        stroke: '#607D8B',
        strokeWidth: 0.75,
        outline: 'none',
      },
    };
  }

  render() {

    if (!geoData.loaded || !labData.loaded || !regions.loaded) {
      return <h6>loading...</h6>;
    }

    const rmap = labData.regionMap;

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
          style={this.getGeographyStyle(geography, rmap)}
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
