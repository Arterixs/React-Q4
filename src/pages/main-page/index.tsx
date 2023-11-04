import { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getUpdateParams } from 'service/getUpdateParams';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { requestPlanet } from 'service/requestPlanet';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { Pagination } from 'components/pagination';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

const DEFAULT_PAGE = '1';

export const MainPage = () => {
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  const [amountPage, setAmountPage] = useState(0);
  const [amountElem, setAmountElem] = useState('10');
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  if (errorHard) {
    throw new Error('There was an error in the fetch request, function getPlanets');
  }
  const searchParam = searchParams.get('search');
  const pageParam = searchParams.get('page');

  useEffect(() => {
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setSearchParams(getUpdateParams(currentPage, searchParam ?? getPrevRequestFromLocal()));
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      currentPage
    );
  }, []);

  const handleClickSearch = (value: string) => {
    setLoading(true);
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    setSearchParams(getUpdateParams(DEFAULT_PAGE, getPrevRequestFromLocal()));
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      DEFAULT_PAGE
    );
  };

  const handleClickOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentElem = event.target.value;
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setLoading(true);
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      currentPage
    );
    setAmountElem(currentElem);
  };

  const clickPagination = (page: number) => {
    const updateTypePage = String(page);
    setSearchParams(getUpdateParams(updateTypePage, getPrevRequestFromLocal()));
    setLoading(true);
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      updateTypePage,
      amountElem
    );
  };
  const isRenderPagination = errorRequest || amountPage === 1;

  return (
    <section className={styles.section}>
      {loading && <BaseLoader />}
      <SearchPart handleClick={handleClickSearch} handleClickOptions={handleClickOptions} amountPage={amountPage} />
      <CardList planets={planets} hasError={errorRequest} />
      {!isRenderPagination && (
        <Pagination
          currentPage={pageParam ? Number(pageParam) : Number(DEFAULT_PAGE)}
          amountPage={amountPage}
          clickPagination={clickPagination}
        />
      )}
    </section>
  );
};
