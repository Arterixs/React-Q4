import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailPage } from 'pages/detail-page';
import { MainPage } from 'pages/main-page';
import { ApiContextWrapper } from 'storage/api-context';

import { Layout } from 'components/layout';

import { ErrorBoundary } from './error-boundary';

export const App = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/frontpage" />} />
        <Route
          path="/frontpage"
          element={
            <ApiContextWrapper>
              <MainPage />
            </ApiContextWrapper>
          }
        >
          <Route path=":id" element={<DetailPage />} />
        </Route>
      </Route>
    </Routes>
  </ErrorBoundary>
);
