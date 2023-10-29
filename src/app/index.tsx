import { Layout } from 'components/layout';

import { ErrorBoundary } from './error-boundary';

export const App = () => (
  <ErrorBoundary>
    <Layout />
  </ErrorBoundary>
);
