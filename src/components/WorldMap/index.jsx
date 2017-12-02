import { Card, CardBlock } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import React from 'react';

import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// import PropTypes from 'prop-types';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from 'react-simple-maps';

import CountryData from '../../store/CountryData';


@observer
class WorldMap extends React.Component {

  constructor() {
    super();
    this.cdata = new CountryData();
  }

  componentWillMount() {
    this.cdata.load();
  }

  render() {

    const cdata = toJS(this.cdata.countryData);
    const ldata = toJS(this.cdata.labRegionData);

    console.log(cdata);
    console.log(ldata);

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
    <Geographies geography="/static/world-50m.json">
      {(geographies, projection) => geographies.map((geography, i) => geography.id !== 'ATA' && (
        <Geography
          key={i}
          data-tip={geography.properties.name}
          geography={geography}
          projection={projection}
          style={{
            default: {
              fill: '#ECEFF1',
              stroke: '#607D8B',
              strokeWidth: 0.75,
              outline: 'none',
            },
            hover: {
              fill: '#607D8B',
              stroke: '#607D8B',
              strokeWidth: 0.75,
              outline: 'none',
            },
            pressed: {
              fill: '#FF5722',
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
