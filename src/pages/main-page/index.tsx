import { useEffect, useState } from 'react';
import { prepareValueRequest } from 'helpers/prepareValueRequest';
import { getPrevRequestFromLocal, setCurrentRequestInLocal } from 'service/localStorageApi';
import { requestPlanet } from 'service/requestPlanet';
import { Planet } from 'types/interface/api';
import { BaseLoader } from 'ui/base-loader';

import { CardList } from 'components/card-list';
import { SearchPart } from 'components/search-part';

import styles from './style.module.css';

export const MainPage = () => {
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorRequest, setErrorRequest] = useState(false);
  const [errorHard, setErrorHard] = useState(false);

  if (errorHard) {
    throw new Error('There was an error in the fetch request, function getPlanets');
  }

  useEffect(() => {
    requestPlanet(getPrevRequestFromLocal(), setPlanets, setLoading, setErrorRequest, setErrorHard);
  }, []);

  const handleClickSearch = (value: string) => {
    setLoading(true);
    const checkValue = prepareValueRequest(value);
    setCurrentRequestInLocal(checkValue);
    requestPlanet(getPrevRequestFromLocal(), setPlanets, setLoading, setErrorRequest, setErrorHard);
  };

  return (
    <section className={styles.section}>
      {loading && <BaseLoader />}
      <SearchPart handleClick={handleClickSearch} />
      <CardList planets={planets} hasError={errorRequest} />
    </section>
  );
};
