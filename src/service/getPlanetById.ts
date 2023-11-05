import { Planet } from 'types/interface/api';

export const getPlanetById = async (url: string) => {
  const response = await fetch(url);
  if (response.ok) {
    const result: Promise<Planet> = response.json();
    return result;
  }
  return null;
};
