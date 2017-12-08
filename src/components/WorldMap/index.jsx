import _ from 'lodash';
import { Card, CardBlock, Button } from 'reactstrap';
import React from 'react';
import { observer } from 'mobx-react';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
} from 'react-simple-maps';

import { geoData, labData, regions, colorScale } from './stores';
import LabGeography from './LabGeography';

@observer
class WorldMap extends React.Component {

  componentWillMount() {
    geoData.load();
    labData.load();
    regions.load();
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
              <Button onClick={labData.download}>
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
                  {(geographies, proj) => geographies.map(geo => (
                    <LabGeography
                      key={geo.id}
                      geography={geo}
                      projection={proj}
                      labitem={_.get(labData.regionMap, geo.id)}
                    />
                  ))}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default WorldMap;
