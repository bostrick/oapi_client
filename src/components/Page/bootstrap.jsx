
import React from 'react';
import WorldMap from '../WorldMap';
import Toolkit from '../Toolkit';

export const registerFactories = (desk) => {

  const f = desk.registerFactory;
  f('toolkit', () => <Toolkit />, Toolkit.desktopProps);
  f('worldmap', () => <WorldMap />, WorldMap.desktopProps);

};

export default registerFactories;
