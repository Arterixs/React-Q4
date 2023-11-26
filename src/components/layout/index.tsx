import { ReactNode } from 'react';

import { Footer } from 'components/footer';
import { Header } from 'components/header';

import styles from './style.module.css';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);
