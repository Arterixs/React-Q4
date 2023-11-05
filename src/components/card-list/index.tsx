import { Planet } from 'types/interface/api';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  planets: Planet[] | null;
  hasError: boolean;
  onClickCard: (url: string) => void;
}

export const CardList = ({ planets, hasError, onClickCard }: CardListProps) => (
  <section className={styles.section}>
    <h2>Planets</h2>
    {getJsxContentOfPlanets(planets, hasError, onClickCard)}
  </section>
);
