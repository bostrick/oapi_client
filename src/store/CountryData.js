import _ from 'lodash';
import { observable, computed } from 'mobx';
import { fetchYaml } from '../utils/fetch';

class CountryData {

  baseUrl = '/static';

  @observable countryData = {};
  @observable labRegionData = {};

  regions = [
    'APAC',
    'EMEA',
    'LATAM',
    'NA',
  ];

  @computed get ready() {
    return !(_.isEmpty(this.coutryData) || _.isEmpty(this.labRegionData));
  }

  load() {

    fetchYaml(`${this.baseUrl}/country-data.yaml`)
      .then(obj => this.countryData = obj);

    fetchYaml(`${this.baseUrl}/country_region_map.yaml`)
      .then(obj => this.labRegionData = obj);
  }
}

export default CountryData;
