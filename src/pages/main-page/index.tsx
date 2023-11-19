import { ChangeEvent, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getUpdateParams } from 'service/getUpdateParams';
import { setCurrentRequestInLocal } from 'service/localStorageApi';
import { useGetPlanetsQuery } from 'service/planetsApi';
import { requestPlanet } from 'service/requestPlanet';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { amountElemPageSelector, searchValueRequestSelector } from 'store/selectors';
import { updateAmount } from 'store/slice/amountElemPage';
import { setPalnets, updateLoading } from 'store/slice/planets';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { Pagination } from 'components/pagination';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

const DEFAULT_PAGE = '1';
const MAX_PAGE_DEFAULT = 6;
const DEFAULT_ELEM_ON_PAGE = 10;

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestValue = useAppSelector(searchValueRequestSelector);
  const amountElem = useAppSelector(amountElemPageSelector);
  const searchParam = searchParams.get('search') ?? requestValue;
  const pageParam = searchParams.get('page') ?? DEFAULT_PAGE;
  const [loading, setLoading] = useState(false);
  const [amountPagPage, setAmountPagPage] = useState(MAX_PAGE_DEFAULT);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);
  const [isShowDetail, setShowDetail] = useState(false);
  const { data, isError, isLoading, error, isFetching } = useGetPlanetsQuery({
    namePlanet: searchParam,
    page: pageParam,
  });

  useEffect(() => {
    if (data) {
      dispatch(setPalnets(data.results));
    }
  }, [data]);

  useEffect(() => {
    dispatch(updateLoading(isLoading));
  }, [isLoading]);

  if (isError) {
    setErrorRequest(true);
  }

  if (errorHard || error) {
    throw new Error('There was an error in the fetch request, function getPlanets');
  }

  const handleClickSearch = (value: string) => {
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    setSearchParams(getUpdateParams(DEFAULT_PAGE, checkValue));
  };

  const handleClickOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    setLoading(true);
    const currentElem = event.target.value;
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setSearchParams(getUpdateParams(DEFAULT_PAGE, requestValue));
    requestPlanet(
      requestValue,
      dispatch,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPagPage,
      currentPage,
      currentElem
    );
    dispatch(updateAmount(currentElem));
  };

  const clickPagination = (page: number) => {
    const updateTypePage = String(page);
    setSearchParams(getUpdateParams(updateTypePage, requestValue));
  };

  const onShowDetail = () => {
    setShowDetail(true);
  };

  const amountPageData = data?.count ?? 0;

  const amountOptionsPage = Math.ceil(amountPageData / DEFAULT_ELEM_ON_PAGE);

  const isRenderPagination = errorRequest || amountOptionsPage === 1;
  const currentPage = pageParam ? Number(pageParam) : Number(DEFAULT_PAGE);

  return (
    <section className={styles.section}>
      {(isLoading || isFetching || loading) && <BaseLoader />}
      <SearchPart
        handleClick={handleClickSearch}
        handleClickOptions={handleClickOptions}
        amountElem={amountElem}
        amountPage={amountOptionsPage}
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
            setErrorRequest,
            setErrorHard,
          }}
        />
      )}
    </section>
  );
};
