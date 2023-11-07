import { useCardsContext } from 'storage/hooks';

import { getJsxContentOfPlanets } from './getJsxContentOfPlanets';

import styles from './style.module.css';

interface CardListProps {
  hasError: boolean;
  clickCard: () => void;
}

export const CardList = ({ hasError, clickCard }: CardListProps) => {
  const { planets } = useCardsContext();
  return (
    <section className={styles.section}>
      <h2>Planets</h2>
      {getJsxContentOfPlanets(planets, hasError, clickCard)}
    </section>
  );
};
