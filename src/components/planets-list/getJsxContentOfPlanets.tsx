import { Planet } from 'types/interface/api';

import { Card } from 'components/card';

import styles from './style.module.css';

const MESSAGE_NOT_FOUND = 'Unfortunately nothing was found for your search';

export const getJsxContentOfPlanets = (planets: Planet[] | null) => {
  if (planets && planets.length) {
    return (
      <div className={styles.list}>
        {planets.map((planet) => (
          <Card planet={planet} key={planet.name} />
        ))}
      </div>
    );
  }

  return <span>{MESSAGE_NOT_FOUND}</span>;
};
