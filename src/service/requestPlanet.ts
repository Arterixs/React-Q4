import { AppDispatch } from 'store/index';
import { setPalnets } from 'store/slice/planets';
import { ReactState } from 'types/type';

import { getResultRequest } from './requestDefaultElem';

const DEFAULT_ELEM_ON_PAGE = 10;

export const requestPlanet = async (
  value: string,
  dispatch: AppDispatch,
  setLoading: ReactState<boolean>,
  setErrorRequest: ReactState<boolean>,
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
      dispatch(setPalnets(resultApi.results));
      setAmountPagPage(amountPagPage);
    } else {
      setErrorRequest(true);
    }
    setLoading(false);
  } catch {
    setErrorHard(true);
    setLoading(false);
  }
};
