import { Planet } from 'types/interface/api';
import { ReactState } from 'types/type';

import { getPlanets } from './getPlanets';

export const requestPlanet = async (
  value: string,
  setPlanet: ReactState<Planet[] | null>,
  setLoading: ReactState<boolean>,
  setErrorRequest: ReactState<boolean>,
  setErrorHard: ReactState<boolean>
) => {
  try {
    const resultApi = await getPlanets(value);
    if (resultApi) {
      setPlanet(resultApi.results);
    } else {
      setErrorRequest(true);
    }
    setLoading(false);
  } catch {
    setErrorHard(true);
    setLoading(false);
  }
};
