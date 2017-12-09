import _ from 'lodash';
import { observable, computed } from 'mobx';
import { fetchYaml, fetchJson } from '../utils/fetch';


class CountryData {

  baseUrl = '/static';

  @observable labRegionData = {};
  @observable geoData = {};

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

    fetchJson(`${this.baseUrl}/world-50m.json`)
      .then(obj => this.geoData = obj);

    Promise.all([
      fetchYaml(`${this.baseUrl}/country-data.yaml`),
      fetchYaml(`${this.baseUrl}/country_region_map.yaml`),
    ]).then((rr) => {
      // add ISO3 codes to country-data
      const cdata = _.keyBy(rr[0], 'ISO3166-1-Alpha-2');
      const ldata = _.keyBy(rr[1], 'code');
      _.forEach(ldata, (value, key) => {
        ldata[key].code_3 = _.get(cdata, `${key}.ISO3166-1-Alpha-3`);
      });
      this.labRegionData = _.keyBy(_.values(ldata), 'code_3');
      console.log('recv');
    });
  }
}

export default CountryData;
