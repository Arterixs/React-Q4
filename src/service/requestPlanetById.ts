import { Planet } from 'types/interface/api';
import { ReactState } from 'types/type';

import { getPlanetById } from './getPlanetById';

export const requestPlanetById = async (
  url: string,
  setPlanet: ReactState<Planet | null>,
  setLoading: ReactState<boolean>,
  setErrorRequest: ReactState<boolean>,
  setErrorHard: ReactState<boolean>
) => {
  try {
    const resultApi = await getPlanetById(url);
    if (resultApi) {
      setPlanet(resultApi);
    } else {
      setErrorRequest(true);
    }
    setLoading(false);
  } catch {
    setErrorHard(true);
    setLoading(false);
  }
};
