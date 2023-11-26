import { useRouter } from 'next/router';
import { useAppSelector } from 'store/hooks';
import { planetsSelector } from 'store/selectors';
import { Planet } from 'types/interface/api';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  hasError: boolean;
  planets: Planet[] | undefined;
}

export const CardList = ({ hasError, planets }: CardListProps) => {
  const router = useRouter();
  const storePlanets = useAppSelector(planetsSelector);
  const actualPlanets = planets && planets.length ? planets : storePlanets;
  return (
    <section className={styles.section}>
      <h2>Planets</h2>
      {getJsxContentOfPlanets(actualPlanets, hasError, router.query)}
    </section>
  );
};
