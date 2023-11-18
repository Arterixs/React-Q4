import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailPage } from 'pages/detail-page';
import { MainPage } from 'pages/main-page';
import { NotFound } from 'pages/not-found';
import { ApiContextWrapper } from 'storage/api-context';

import { Layout } from 'components/layout';

export const App = () => (
    <Routes>
      <Route path="*" element={<NotFound />} />
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
);
