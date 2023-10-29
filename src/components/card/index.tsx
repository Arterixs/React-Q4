import clsx from 'clsx';
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
  const classes = clsx(styles['cell-info_left'], styles['cell-info']);
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>{planet.name}</h3>
      <ul className={styles.list}>
        {dataOfPlanet.map((planetInfo) => (
          <li className={styles['list-item']} key={planetInfo[FIRST_ELEM]}>
            <div className={classes}>
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
