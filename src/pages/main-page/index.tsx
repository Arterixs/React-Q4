import { ChangeEvent, useEffect, useState } from 'react';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { requestPlanet } from 'service/requestPlanet';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { Pagination } from 'components/pagination';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

export const MainPage = () => {
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  const [amountPage, setAmountPage] = useState(0);
  const [amountElem, setAmountElem] = useState('10');
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);

  if (errorHard) {
    throw new Error('There was an error in the fetch request, function getPlanets');
  }

  useEffect(() => {
    requestPlanet(getPrevRequestFromLocal(), setPlanets, setLoading, setErrorRequest, setErrorHard, setAmountPage);
  }, []);

  const handleClickSearch = (value: string) => {
    setLoading(true);
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    requestPlanet(getPrevRequestFromLocal(), setPlanets, setLoading, setErrorRequest, setErrorHard, setAmountPage);
  };

  const handleClickOptions = (event: ChangeEvent<HTMLSelectElement>) => {
    const currentElem = event.target.value;
    setLoading(true);
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      currentElem
    );
    setAmountElem(currentElem);
  };

  const clickPagination = (page: number) => {
    setLoading(true);
    requestPlanet(
      getPrevRequestFromLocal(),
      setPlanets,
      setLoading,
      setErrorRequest,
      setErrorHard,
      setAmountPage,
      amountElem,
      page
    );
  };

  return (
    <section className={styles.section}>
      {loading && <BaseLoader />}
      <SearchPart handleClick={handleClickSearch} handleClickOptions={handleClickOptions} amountPage={amountPage} />
      <CardList planets={planets} hasError={errorRequest} />
      {!errorRequest && <Pagination amountPage={amountPage} clickPagination={clickPagination} />}
    </section>
  );
};
