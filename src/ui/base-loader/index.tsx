import styles from './style.module.css';

export const BaseLoader = () => (
  <div className={styles.wrapper} data-testid="loader">
    <div className={styles.preloader} />
  </div>
);
