import { getIdCard } from 'helpers/getIdCard';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { Planet } from 'types/interface/api';

import { Card } from 'components/card';

import styles from './style.module.css';

const MESSAGE_NOT_FOUND = 'Unfortunately nothing was found for your search';
const MESSAGE_ERROR = 'Something went wrong. Refresh the page after some time.';

export const getJsxContentOfPlanets = (planets: Planet[] | undefined, hasError: boolean, query: ParsedUrlQuery) => {
  if (planets && planets.length) {
    return (
      <div className={styles.list}>
        {planets.map((planet) => {
          const id = getIdCard(planet.url);

          const navigateData = {
            pathname: `/frontpage/${id}`,
            query: {
              ...query,
              details: id,
            },
          };
          return (
            <Link href={navigateData} key={planet.name} className={styles.link}>
              <Card planet={planet} />
            </Link>
          );
        })}
      </div>
    );
  }
  const message = hasError ? MESSAGE_ERROR : MESSAGE_NOT_FOUND;
  return (
    <div className={styles['wrapper-error']}>
      <span className={styles.message}>{message}</span>
    </div>
  );
};
