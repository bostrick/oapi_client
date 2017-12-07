import _ from 'lodash';
import { Card, CardBlock, Button } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import React from 'react';

// import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import { scaleOrdinal, schemeCategory20 } from 'd3-scale';
import { color, white } from 'd3-color';

import yaml from 'js-yaml';
import FileSaver from 'file-saver';

import AsyncAsset from '../../store/AsyncAsset';

class Regions extends AsyncAsset {

  get names() {
    return _.map(this.data, obj => obj.name);
  }

  get len() {
    return this.data.length;
  }
}

class LabData extends AsyncAsset {

  // @computed
  get regionMap() {
    return _.keyBy(this.data, 'code_3');
  }

  // @action
  setRegion = (code3, newRegion) => {
    const litem = _.get(this.regionMap, code3);
    if (!_.isNil(litem)) { litem.region = newRegion; }
  }
}

const geoData = new AsyncAsset('world-50m.json');
const labData = new LabData('labenv_region_map.yaml');
const regions = new Regions('regions.yaml');
const colorScale = scaleOrdinal(schemeCategory20).unknown(white);

@observer
class LabGeo extends React.Component {

  getGeographyStyle(labitem) {

    const region = _.get(labitem, 'region');
    const cstr = region ? colorScale(region) : 'white';
    const geoColor = color(cstr);

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

  handleClick = () => {
    // const litem = _.get(labData.regionMap, path.id);
    const l = this.props.labitem;
    const idx = _.indexOf(regions.names, l.region);
    const newRegion = regions.names[(idx + 1) % regions.len];
    // labData.setRegion(path.id, newRegion);
    labData.setRegion(l.code_3, newRegion);
  }

  render() {
    const geo = this.props.geography;
    const proj = this.props.projection;
    return (
      <Geography
        cacheId={geo.id}
        data-tip="hello"
        geography={geo}
        projection={proj}
        style={this.getGeographyStyle(this.props.labitem)}
        onClick={this.handleClick}
      />
    );
  }
}

@observer
class WorldMap extends React.Component {

  componentWillMount() {
    geoData.load();
    labData.load();
    regions.load();
  }

  handleDownloadClick() {
    console.log('click');
    console.log(toJS(labData.data));
    const text = yaml.safeDump(toJS(labData.data));
    const blob = new Blob([text]);
    FileSaver.saveAs(blob, 'hello world.yaml');
  }

  render() {

    if (!geoData.loaded || !labData.loaded || !regions.loaded) {
      return <h6>loading...</h6>;
    }

    // FIXME: should this really be in render?
    colorScale.domain(regions.names);

    return (
      <div>
        <h1>World Map</h1>
        <Card>
          <CardBlock>
            <div>
              <Button onClick={this.handleDownloadClick}>
                Download
              </Button>
            </div>

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
        <LabGeo
          key={geography.id}
          geography={geography}
          projection={projection}
          labitem={labData.regionMap[geography.id]}
        />

        // <Geography - this wouldn't react to mobx change...
        //   key={geography.id}
        //   cacheId={geography.id}
        //   data-tip="hello"
        //   data-litem={_.get(labData.regionMap, geography.id)}
        //   geography={geography}
        //   projection={projection}
        //   style={this.getGeographyStyle(geography)}
        //   onClick={this.handleClick}
        // />

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
