
import React from 'react';
import WorldMap from '../WorldMap';
import Toolkit from '../Toolkit';
import OpenAPIManager from '../OpenAPIManager';

export const registerFactories = (desk) => {

  const f = desk.registerFactory;
  f('toolkit', () => <Toolkit />, Toolkit.desktopProps);
  f('worldmap', () => <WorldMap />, WorldMap.desktopProps);
  f('openapi', () => <OpenAPIManager />, OpenAPIManager.desktopProps);

};

export default registerFactories;
