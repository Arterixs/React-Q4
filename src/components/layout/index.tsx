import { MainPage } from 'pages/main-page';

import { Footer } from 'components/footer';
import { Header } from 'components/header';

import styles from './style.module.css';

export const Layout = () => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>
      <MainPage />
    </main>
    <Footer />
  </div>
);
