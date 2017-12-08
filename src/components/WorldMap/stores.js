import _ from 'lodash';
import { computed, action } from 'mobx';
import { scaleOrdinal, schemeCategory20 } from 'd3-scale';
import { white } from 'd3-color';

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

  @computed
  get regionMap() {
    return _.keyBy(this.data, 'code_3');
  }

  @action
  setRegion = (code3, newRegion) => {
    const litem = _.get(this.regionMap, code3);
    if (!_.isNil(litem)) { litem.region = newRegion; }
  }
}

export const geoData = new AsyncAsset('world-50m.json');
export const labData = new LabData('labenv_region_map.yaml');
export const regions = new Regions('regions.yaml');
export const colorScale = scaleOrdinal(schemeCategory20).unknown(white);
