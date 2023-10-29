import { Planet } from 'types/interface/api';

import { getArrayPlanetInfo } from './getArrayPlanetInfo';

import styles from './style.module.css';

const FIRST_ELEM = 0;
const SECOND_ELEM = 1;

interface CardProps {
  planet: Planet;
}

export const Card = ({ planet }: CardProps) => {
  const dataOfPlanet = getArrayPlanetInfo(planet);
  return (
    <article className={styles.card}>
      <h3>{planet.name}</h3>
      <ul className={styles.list}>
        {dataOfPlanet.map((planetInfo) => (
          <li className={styles['list-item']} key={planetInfo[FIRST_ELEM]}>
            <div className={styles['cell-info']}>
              <span>{planetInfo[FIRST_ELEM]}</span>
            </div>
            <div className={styles['cell-info']}>
              <span>{planetInfo[SECOND_ELEM]}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
