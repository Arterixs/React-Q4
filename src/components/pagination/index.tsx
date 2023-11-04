import { useState } from 'react';
import { ButtonClasses } from 'types/enum/classes';
import { BaseButton } from 'ui/base-button';

import { changeStateBtnNextAndPrev } from './changeStateBtnNextAndPrev';

import styles from './style.module.css';

interface PaginationProps {
  amountPage: number;
  clickPagination: (page: number) => void;
}

const ARRAY_AMOUNT_BTN = [1, 2, 3];
const ONE_PAGE = 1;
const FIRST_PAGE = 1;
const THIRD_BTN_PAGINATION = 2;
const FIRST_BTN_PAGINATION = 0;

export const Pagination = (props: PaginationProps) => {
  const [btnPage, setBtnPage] = useState(ARRAY_AMOUNT_BTN);
  const [currentPage, setCurrentPage] = useState(FIRST_PAGE);
  const [isDisabledNext, setDisabledNext] = useState(false);
  const [isDisabledPrev, setDisabledPrev] = useState(true);

  const handleClickMoveNext = () => {
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
      <BaseButton classBtn={ButtonClasses.BTN_PAGINATION} onClick={handleClickMovePrev} disabled={isDisabledPrev}>
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
      <BaseButton classBtn={ButtonClasses.BTN_PAGINATION} onClick={handleClickMoveNext} disabled={isDisabledNext}>
        <span>{'>'}</span>
      </BaseButton>
    </section>
  );
};
