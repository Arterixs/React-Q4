/* eslint-disable react/jsx-props-no-spreading */
import { ElementType, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { Router } from 'next/router';
import { store } from 'store/index';
import { BaseLoader } from 'ui/base-loader';

import { EmptyLayout } from 'components/empty-layout';
import { ErrorBoundary } from 'components/error-boundary';
import { Layout } from 'components/layout';

import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps & { Component: { Layout: ElementType } }) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const PageLayout = Component.Layout || EmptyLayout;
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Layout>
          {loading && <BaseLoader />}
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
        </Layout>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
