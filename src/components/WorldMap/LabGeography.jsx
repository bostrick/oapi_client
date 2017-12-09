import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Geography } from 'react-simple-maps';
import { color } from 'd3-color';
import { labData, regions, colorScale } from './stores';

@observer
class LabGeography extends React.Component {

  static propTypes = {
    labitem: PropTypes.shape({
      code_3: PropTypes.string,
    }).isRequired,
    geography: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    projection: PropTypes.func.isRequired,
  };

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
    const l = this.props.labitem;
    const idx = _.indexOf(regions.names, l.region);
    const newRegion = regions.names[(idx + 1) % regions.len];
    labData.setRegion(l.code_3, newRegion);
  }

  render() {
    const { labitem, geography, projection } = this.props;

    if (!labitem) {
      global.log.warn(`no item for ${geography.id}`);
    }

    return (
      <Geography
        cacheId={geography.id}
        geography={geography}
        projection={projection}
        style={this.getGeographyStyle(labitem)}
        onClick={this.handleClick}
      >
        <title>
          {`${labitem.code} ${labitem.name}: ${labitem.region}`}
        </title>
      </Geography>
    );
  }
}

export default LabGeography;
