import { Planet } from 'types/interface/api';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  planets: Planet[] | null;
  hasError: boolean;
  clickCard: () => void;
}

export const CardList = ({ planets, hasError, clickCard }: CardListProps) => (
  <section className={styles.section}>
    <h2>Planets</h2>
    {getJsxContentOfPlanets(planets, hasError, clickCard)}
  </section>
);
