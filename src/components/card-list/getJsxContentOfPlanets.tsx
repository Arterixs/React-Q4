import { getIdCard } from 'helpers/getIdCard';
import { Planet } from 'types/interface/api';

import { Card } from 'components/card';

import styles from './style.module.css';

const MESSAGE_NOT_FOUND = 'Unfortunately nothing was found for your search';
const MESSAGE_ERROR = 'Something went wrong. Refresh the page after some time.';

export const getJsxContentOfPlanets = (planets: Planet[] | undefined, hasError: boolean, clickCard: () => void) => {
  if (planets && planets.length) {
    return (
      <div className={styles.list}>
        {planets.map((planet) => {
          const id = getIdCard(planet.url);
          return (
            // <NavLink to={`${id}`} key={planet.name} onClick={clickCard} className={styles.link}>
            <Card planet={planet} key={planet.name} />
            // </NavLink>
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
