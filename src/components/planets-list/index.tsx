import { Planet } from 'types/interface/api';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  planets: Planet[] | null;
}

export const PlanetsList = ({ planets }: CardListProps) => (
  <section className={styles.section}>
    <h2>Planets</h2>
    {getJsxContentOfPlanets(planets)}
  </section>
);
