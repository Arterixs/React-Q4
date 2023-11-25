/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from 'store/index';

import { ErrorBoundary } from 'components/error-boundary';
import { Layout } from 'components/layout';

import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  </ErrorBoundary>
);

export default App;
