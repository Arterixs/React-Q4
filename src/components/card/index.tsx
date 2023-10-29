import { Planet } from 'types/interface/api';

import { getArrayPlanetInfo } from './getArrayPlanetInfo';

import styles from './style.module.css';

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
          <li className={styles['list-item']} key={planetInfo[0]}>
            <div className={styles['cell-info']}>
              <span>{planetInfo[0]}</span>
            </div>
            <div className={styles['cell-info']}>
              <span>{planetInfo[1]}</span>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
