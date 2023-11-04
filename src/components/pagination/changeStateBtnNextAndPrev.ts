import { ReactState } from 'types/type';

const ONE_PAGE = 1;
const MIN_PAGE = 0;

export const changeStateBtnNextAndPrev = (
  current: number,
  setDisabledNext: ReactState<boolean>,
  setDisabledPrev: ReactState<boolean>,
  maxPage: number
) => {
  let btnNext = false;
  let btnPrev = false;
  if (current + ONE_PAGE > maxPage) {
    btnNext = true;
  }
  if (current - ONE_PAGE === MIN_PAGE) {
    btnPrev = true;
  }
  setDisabledNext(btnNext);
  setDisabledPrev(btnPrev);
};
