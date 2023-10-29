import { Planet } from 'types/interface/api';

import { Card } from 'components/card';

import styles from './style.module.css';

const MESSAGE_NOT_FOUND = 'Unfortunately nothing was found for your search';
const MESSAGE_ERROR = 'Something went wrong. Refresh the page after some time.';

export const getJsxContentOfPlanets = (planets: Planet[] | null, hasError: boolean) => {
  if (planets && planets.length) {
    return (
      <div className={styles.list}>
        {planets.map((planet) => (
          <Card planet={planet} key={planet.name} />
        ))}
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
