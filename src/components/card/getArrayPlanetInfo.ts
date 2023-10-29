import { Planet } from 'types/interface/api';

const FIRST_ELEM = 0;
const LATEST_ELEM = 9;

export const getArrayPlanetInfo = (planet: Planet) =>
  Object.entries(planet).filter((_item, indx) => indx > FIRST_ELEM && indx < LATEST_ELEM);
