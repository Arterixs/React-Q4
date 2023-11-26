import { useRouter } from 'next/router';
import { getRunningQueriesThunk, planetApi } from 'service/planetApi';
import { wrapper } from 'store/index';
import { ButtonClasses } from 'types/enum/classes';
import { Planet } from 'types/interface/api';
import { BaseButton } from 'ui/base-button';

import { Card } from 'components/card';

import MainPage from '..';

import styles from './styles.module.css';

interface DetailPageProps {
  data: Planet | undefined;
  id: string;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { id } = context.query;
  const checkedId = String(id);

  store.dispatch(planetApi.endpoints.getPlanetById.initiate(checkedId));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  const result = planetApi.endpoints.getPlanetById.select(checkedId)(store.getState());
  const { data } = result;
  return {
    props: {
      data,
      id: checkedId,
    },
  };
});

const DetailPage = ({ data, id }: DetailPageProps) => {
  const router = useRouter();

  const onCloseCard = () => {
    const navigateData = {
      pathname: `/frontpage`,
      query: {
        search: router.query.search,
        page: router.query.page,
      },
    };
    router.push(navigateData);
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
        {data && <Card planet={data} />}
      </section>
    </div>
  );
};

DetailPage.Layout = MainPage;
export default DetailPage;
