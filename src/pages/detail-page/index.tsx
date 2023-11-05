import { useEffect, useState } from 'react';
import { redirect, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { getUpdateParams } from 'service/getUpdateParams';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { requestPlanetById } from 'service/requestPlanetById';
import { ButtonClasses } from 'types/enum/classes';
import { Planet } from 'types/interface/api';
import { ReactState } from 'types/type';
import { BaseButton } from 'ui/base-button';

import { Card } from 'components/card';

import styles from './styles.module.css';

interface ContextType {
  currentPage: string;
  searchParam: string | null;
  setLoading: ReactState<boolean>;
  setShowDetail: ReactState<boolean>;
  setErrorRequest: ReactState<boolean>;
  setErrorHard: ReactState<boolean>;
}

export const DetailPage = () => {
  const { id } = useParams();
  const { currentPage, searchParam, setLoading, setErrorRequest, setShowDetail, setErrorHard } =
    useOutletContext<ContextType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [planet, setPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    setSearchParams({ ...getUpdateParams(currentPage, searchParam ?? getPrevRequestFromLocal()), detail: id! });
    requestPlanetById(id!, setPlanet, setLoading, setErrorRequest, setErrorHard);
    return () => {
      searchParams.delete('detail');
      setSearchParams(searchParams);
    };
  }, []);

  const onCloseCard = () => {
    setShowDetail(false);
    redirect('frontpage');
  };

  const onStopPropagination = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.wrapper} onClick={onCloseCard} onKeyUp={() => {}} role="presentation">
      <section className={styles.section} onClick={onStopPropagination} onKeyUp={() => {}} role="presentation">
        <div className={styles.div}>
          <h3>Details</h3>
          <BaseButton onClick={onCloseCard} classBtn={ButtonClasses.BTN_ERROR}>
            <span>Close</span>
          </BaseButton>
        </div>
        {planet && <Card planet={planet} />}
      </section>
    </div>
  );
};
