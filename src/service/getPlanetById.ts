import { Planet } from 'types/interface/api';

import { API } from './api';

export const getPlanetById = async (id: string) => {
  const url = `${API}${id}/`;
  const response = await fetch(url);
  if (response.ok) {
    const result: Promise<Planet> = response.json();
    return result;
  }
  return null;
};
