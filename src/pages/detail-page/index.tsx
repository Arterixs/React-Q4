import { useEffect } from 'react';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { getUpdateParams } from 'service/getUpdateParams';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { useGetPlanetByIdQuery } from 'service/planetApi';
import { useAppDispatch } from 'store/hooks';
import { setPlanet, updatePlanetLoading } from 'store/slice/planet';
import { ButtonClasses } from 'types/enum/classes';
import { ReactState } from 'types/type';
import { BaseButton } from 'ui/base-button';
import { BaseLoader } from 'ui/base-loader';

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
  const dispatch = useAppDispatch();
  const { currentPage, searchParam, setErrorRequest, setShowDetail, setErrorHard } = useOutletContext<ContextType>();
  const { id } = useParams();
  const { data, isLoading, isError, isFetching, error } = useGetPlanetByIdQuery(id!);

  if (isError) {
    setErrorRequest(isError);
  }

  if (error) {
    setErrorHard(true);
  }

  useEffect(() => {
    dispatch(updatePlanetLoading(isLoading));
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      dispatch(setPlanet(data));
    }
  }, [data]);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    setSearchParams({ ...getUpdateParams(currentPage, searchParam ?? getPrevRequestFromLocal()), detail: id! });
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
    <>
      {(isLoading || isFetching) && <BaseLoader />}
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
          {data && <Card planet={data} />}
        </section>
      </div>
    </>
  );
};
