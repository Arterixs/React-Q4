import { useAppSelector } from 'store/hooks';
import { planetsSelector } from 'store/selectors';
import { Planet } from 'types/interface/api';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  hasError: boolean;
  clickCard: () => void;
  planets: Planet[] | undefined;
}

export const CardList = ({ hasError, clickCard, planets }: CardListProps) => (
  // const planets = useAppSelector(planetsSelector);
  <section className={styles.section}>
    <h2>Planets</h2>
    {getJsxContentOfPlanets(planets, hasError, clickCard)}
  </section>
);
