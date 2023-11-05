import { ChangeEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { DetailPage } from 'pages/detail-page';
import { getUpdateParams } from 'service/getUpdateParams';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { requestPlanet } from 'service/requestPlanet';
import { requestPlanetById } from 'service/requestPlanetById';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { Pagination } from 'components/pagination';
import { SearchPart } from 'components/search-part';

import { getIdCard } from './getIdCard';

import styles from './style.module.css';

const DEFAULT_PAGE = '1';
const DEFAULT_ELEM_PAGE = '10';
const MAX_PAGE_DEFAULT = 6;

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [amountPage, setAmountPage] = useState(0);
  const [amountPagPage, setAmountPagPage] = useState(MAX_PAGE_DEFAULT);
  const [amountElem, setAmountElem] = useState(DEFAULT_ELEM_PAGE);
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);
  const [isDetailPage, setDetailPage] = useState(false);
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
      setAmountPagPage,
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
      setAmountPagPage,
      DEFAULT_PAGE
    );
  };

  const handleClickOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentElem = event.target.value;
    const currentPage = pageParam ?? DEFAULT_PAGE;
    setSearchParams(getUpdateParams(DEFAULT_PAGE, getPrevRequestFromLocal()));
    setLoading(true);
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      setAmountPagPage,
      currentPage,
      currentElem
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
      setAmountPagPage,
      updateTypePage,
      amountElem
    );
  };

  const onClickCard = (url: string) => {
    const currentPage = pageParam ?? DEFAULT_PAGE;
    const id = getIdCard(url);
    setSearchParams({ ...getUpdateParams(currentPage, searchParam ?? getPrevRequestFromLocal()), detail: id });
    setLoading(true);
    setDetailPage(true);
    requestPlanetById(url, setPlanet, setLoading, setErrorRequest, setErrorHard);
  };

  const onCloseCard = () => {
    setDetailPage(false);
    searchParams.delete('detail');
    setSearchParams(searchParams);
  };

  const onCloseCardTest = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
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
      <CardList planets={planets} hasError={errorRequest} onClickCard={onClickCard} />
      {!isRenderPagination && (
        <Pagination
          currentPage={currentPage}
          amountPage={amountPagPage}
          clickPagination={clickPagination}
          key={currentPage}
        />
      )}
      {isDetailPage &&
        createPortal(<DetailPage planet={planet} onClose={onCloseCard} onCloseBtn={onCloseCardTest} />, document.body)}
    </section>
  );
};
