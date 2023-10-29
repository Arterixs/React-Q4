import { Planet } from 'types/interface/api';

import { Card } from 'components/card';

import styles from './style.module.css';

interface CardListProps {
  planets: Planet[] | null;
}

export const PlanetsList = ({ planets }: CardListProps) => (
  <section className={styles.section}>
    <h2>Planets</h2>
    {planets && (
      <div className={styles.list}>
        {planets.map((planet) => (
          <Card planet={planet} key={planet.name} />
        ))}
      </div>
    )}
  </section>
);
