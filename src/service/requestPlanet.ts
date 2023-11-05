import { Planet } from 'types/interface/api';
import { ReactState } from 'types/type';

import { getResultRequest } from './requestDefaultElem';

const DEFAULT_ELEM_ON_PAGE = 10;

export const requestPlanet = async (
  value: string,
  setPlanet: ReactState<Planet[] | null>,
  setLoading: ReactState<boolean>,
  setErrorRequest: ReactState<boolean>,
  setErrorHard: ReactState<boolean>,
  setAmountPage: ReactState<number>,
  setAmountPagPage: ReactState<number>,
  page = '',
  amountElem = '10'
) => {
  try {
    const numberAmountElem = Number(amountElem);
    const resultApi = await getResultRequest(value, page, numberAmountElem);
    if (resultApi) {
      const amountPagPage = Math.ceil(resultApi.count / DEFAULT_ELEM_ON_PAGE);
      const amountOptionsPage = Math.ceil(resultApi.finalCount / DEFAULT_ELEM_ON_PAGE);
      setPlanet(resultApi.results);
      setAmountPage(amountOptionsPage);
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
