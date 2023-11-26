import { AppDispatch } from 'store/index';
import { setPlanets } from 'store/slice/planets';
import { ReactState } from 'types/type';

import { getResultRequest } from './requestDefaultElem';

const DEFAULT_ELEM_ON_PAGE = 10;

export const requestPlanet = async (
  value: string,
  dispatch: AppDispatch,
  setErrorHard: ReactState<boolean>,
  setAmountPagPage: ReactState<number>,
  page = '',
  amountElem = '10'
) => {
  try {
    const numberAmountElem = Number(amountElem);
    const resultApi = await getResultRequest(value, page, numberAmountElem);
    if (resultApi) {
      const amountPagPage = Math.ceil(resultApi.count / DEFAULT_ELEM_ON_PAGE);
      dispatch(setPlanets(resultApi.results));
      setAmountPagPage(amountPagPage);
    }
  } catch {
    setErrorHard(true);
  }
};
