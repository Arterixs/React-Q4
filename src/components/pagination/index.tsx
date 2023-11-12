import { useState } from 'react';
import { ButtonClasses } from 'types/enum/classes';
import { BaseButton } from 'ui/base-button';

import { changeStateBtnNextAndPrev } from './changeStateBtnNextAndPrev';
import { getInitialBtn } from './getInitialBtn';

import styles from './style.module.css';

interface PaginationProps {
  amountPage: number;
  currentPage: number;
  clickPagination: (page: number) => void;
}

const ONE_PAGE = 1;
const MIN_PAGE = 0;
const THIRD_BTN_PAGINATION = 2;
const FIRST_BTN_PAGINATION = 0;

export const Pagination = (props: PaginationProps) => {
  const [btnPage, setBtnPage] = useState(() => getInitialBtn(props.currentPage));
  const [currentPage, setCurrentPage] = useState(props.currentPage);
  const [isDisabledNext, setDisabledNext] = useState(props.currentPage + ONE_PAGE > props.amountPage);
  const [isDisabledPrev, setDisabledPrev] = useState(props.currentPage - ONE_PAGE === MIN_PAGE);

  const handleClickMoveNext = () => {
    if (currentPage + ONE_PAGE > props.amountPage) {
      setDisabledNext(true);
      return;
    }
    if (currentPage === btnPage[THIRD_BTN_PAGINATION]) {
      const updateBtnPage = btnPage.map((num) => num + ONE_PAGE);
      setBtnPage(updateBtnPage);
    }
    setCurrentPage((current) => current + ONE_PAGE);
    changeStateBtnNextAndPrev(currentPage + ONE_PAGE, setDisabledNext, setDisabledPrev, props.amountPage);
    props.clickPagination(currentPage + ONE_PAGE);
  };

  const handleClickMovePrev = () => {
    if (currentPage === btnPage[FIRST_BTN_PAGINATION]) {
      const updateBtnPage = btnPage.map((num) => num - ONE_PAGE);
      setBtnPage(updateBtnPage);
    }
    setCurrentPage((current) => current - ONE_PAGE);
    changeStateBtnNextAndPrev(currentPage - ONE_PAGE, setDisabledNext, setDisabledPrev, props.amountPage);
    props.clickPagination(currentPage - ONE_PAGE);
  };

  const handleClick = (num: number) => {
    setCurrentPage(num);
    changeStateBtnNextAndPrev(num, setDisabledNext, setDisabledPrev, props.amountPage);
    props.clickPagination(num);
  };

  return (
    <section className={styles.pagination}>
      <BaseButton
        classBtn={ButtonClasses.BTN_PAGINATION}
        onClick={handleClickMovePrev}
        disabled={isDisabledPrev}
        data-testid="btn-prev"
      >
        <span>{'<'}</span>
      </BaseButton>
      {btnPage.map((number, index, btns) => {
        const currentNumber = btns[index];
        const classes =
          currentPage === currentNumber
            ? [ButtonClasses.BTN_PAGINATION, ButtonClasses.BTN_PAGINATION_ACTIVE]
            : ButtonClasses.BTN_PAGINATION;
        const isDisabled = currentNumber > props.amountPage;
        return (
          <BaseButton classBtn={classes} onClick={() => handleClick(currentNumber)} key={index} disabled={isDisabled}>
            <span>{number}</span>
          </BaseButton>
        );
      })}
      <BaseButton
        classBtn={ButtonClasses.BTN_PAGINATION}
        onClick={handleClickMoveNext}
        disabled={isDisabledNext}
        data-testid="btn-next"
      >
        <span>{'>'}</span>
      </BaseButton>
    </section>
  );
};
