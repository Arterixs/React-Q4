import styles from './style.module.css';

export const BaseError = () => (
  <div className={styles.wrapper}>
    <h1>Something went wrong!</h1>
    <h2>Please check your console</h2>
  </div>
);
