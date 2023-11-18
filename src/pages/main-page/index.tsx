import { ChangeEvent, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getUpdateParams } from 'service/getUpdateParams';
import { setCurrentRequestInLocal } from 'service/localStorageApi';
import { requestPlanet } from 'service/requestPlanet';
import { useCardsContext } from 'storage/hooks';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { amountElemPageSelector, searchValueRequestSelector } from 'store/selectors';
import { updateAmount } from 'store/slice/amountElemPage';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { Pagination } from 'components/pagination';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

const DEFAULT_PAGE = '1';
const MAX_PAGE_DEFAULT = 6;

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { updatePlanets } = useCardsContext();
  const requestValue = useAppSelector(searchValueRequestSelector);
  const amountElem = useAppSelector(amountElemPageSelector);
  const [searchParams, setSearchParams] = useSearchParams();
  const [amountPage, setAmountPage] = useState(0);
  const [amountPagPage, setAmountPagPage] = useState(MAX_PAGE_DEFAULT);
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);
  const [isShowDetail, setShowDetail] = useState(false);

  if (errorHard) {
    throw new Error('There was an error in the fetch request, function getPlanets');
  }
  const searchParam = searchParams.get('search');
  const pageParam = searchParams.get('page');

  useEffect(() => {
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setSearchParams(getUpdateParams(currentPage, searchParam ?? requestValue));
    requestPlanet(
      requestValue,
      updatePlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      setAmountPagPage,
      currentPage
    );
  }, []);

  const handleClickSearch = (value: string) => {
    setLoading(true);
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    setSearchParams(getUpdateParams(DEFAULT_PAGE, checkValue));
    requestPlanet(
      checkValue,
      updatePlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      setAmountPagPage,
      DEFAULT_PAGE
    );
  };

  const handleClickOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentElem = event.target.value;
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setSearchParams(getUpdateParams(DEFAULT_PAGE, requestValue));
    setLoading(true);
    requestPlanet(
      requestValue,
      updatePlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      setAmountPagPage,
      currentPage,
      currentElem
    );
    dispatch(updateAmount(currentElem));
  };

  const clickPagination = (page: number) => {
    const updateTypePage = String(page);
    setSearchParams(getUpdateParams(updateTypePage, requestValue));
    setLoading(true);
    requestPlanet(
      requestValue,
      updatePlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      setAmountPagPage,
      updateTypePage,
      amountElem
    );
  };

  const onShowDetail = () => {
    setLoading(true);
    setShowDetail(true);
  };

  const isRenderPagination = errorRequest || amountPage === 1;
  const currentPage = pageParam ? Number(pageParam) : Number(DEFAULT_PAGE);

  return (
    <section className={styles.section}>
      {loading && <BaseLoader />}
      <SearchPart
        handleClick={handleClickSearch}
        handleClickOptions={handleClickOptions}
        amountElem={amountElem}
        amountPage={amountPage}
      />
      <CardList hasError={errorRequest} clickCard={onShowDetail} />
      {!isRenderPagination && (
        <Pagination
          currentPage={currentPage}
          amountPage={amountPagPage}
          clickPagination={clickPagination}
          key={currentPage}
        />
      )}
      {isShowDetail && (
        <Outlet
          context={{
            currentPage: pageParam ?? DEFAULT_PAGE,
            searchParam,
            setShowDetail,
            setLoading,
            setErrorRequest,
            setErrorHard,
          }}
        />
      )}
    </section>
  );
};
