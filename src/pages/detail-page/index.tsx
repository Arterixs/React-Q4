import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { getUpdateParams } from 'service/getUpdateParams';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { requestPlanetById } from 'service/requestPlanetById';
import { useDetailContext } from 'storage/hooks';
import { ButtonClasses } from 'types/enum/classes';
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
  const { planet, updatePlanet } = useDetailContext();
  const { currentPage, searchParam, setLoading, setErrorRequest, setShowDetail, setErrorHard } =
    useOutletContext<ContextType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ ...getUpdateParams(currentPage, searchParam ?? getPrevRequestFromLocal()), detail: id! });
    requestPlanetById(id!, updatePlanet, setLoading, setErrorRequest, setErrorHard);
    return () => {
      searchParams.delete('detail');
      setSearchParams(searchParams);
    };
  }, []);

  const onCloseCard = () => {
    setShowDetail(false);
    navigate('/');
  };

  const onStopPropagination = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div className={styles.wrapper} onClick={onCloseCard} onKeyUp={() => {}} role="presentation">
      <section
        className={styles.section}
        onClick={onStopPropagination}
        onKeyUp={() => {}}
        role="presentation"
        data-testid={`details-${id}`}
      >
        <div className={styles.div}>
          <h3>Details</h3>
          <BaseButton onClick={onCloseCard} classBtn={ButtonClasses.BTN_ERROR} data-testid="close">
            <span>Close</span>
          </BaseButton>
        </div>
        {planet && <Card planet={planet} />}
      </section>
    </div>
  );
};
