import { AppDispatch } from 'store/index';
import { setPalnet } from 'store/slice/planet';
import { ReactState } from 'types/type';

import { getPlanetById } from './getPlanetById';

export const requestPlanetById = async (
  id: string,
  dispatch: AppDispatch,
  setLoading: ReactState<boolean>,
  setErrorRequest: ReactState<boolean>,
  setErrorHard: ReactState<boolean>
) => {
  try {
    const resultApi = await getPlanetById(id);
    if (resultApi) {
      dispatch(setPalnet(resultApi));
    } else {
      setErrorRequest(true);
    }
    setLoading(false);
  } catch {
    setErrorHard(true);
    setLoading(false);
  }
};
