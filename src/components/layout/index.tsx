import { Outlet } from 'react-router-dom';

import { Footer } from 'components/footer';
import { Header } from 'components/header';

import styles from './style.module.css';

export const Layout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <Outlet />
    </main>
    <Footer />
  </div>
);
