import { useAppSelector } from 'store/hooks';
import { planetsSelector } from 'store/selectors';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  hasError: boolean;
  clickCard: () => void;
}

export const CardList = ({ hasError, clickCard }: CardListProps) => {
  const planets = useAppSelector(planetsSelector);

  return (
    <section className={styles.section}>
      <h2>Planets</h2>
      {getJsxContentOfPlanets(planets, hasError, clickCard)}
    </section>
  );
};
