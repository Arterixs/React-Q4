import { PlanetsRequest } from 'types/interface/api';

import { API } from './api';

export const getPlanets = async (namePlanet: string, page: number) => {
  const queryParam = namePlanet ? `?search=${namePlanet}?page=${page}` : `?page=${page}`;
  const response = await fetch(`${API}${queryParam}`);
  if (response.ok) {
    const result: Promise<PlanetsRequest> = response.json();
    return result;
  }
  return null;
};
