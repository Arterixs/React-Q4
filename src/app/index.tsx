import { Navigate, Route, Routes } from 'react-router-dom';
import { DetailPage } from 'pages/detail-page';
import { MainPage } from 'pages/main-page';
import { NotFound } from 'pages/not-found';

import { Layout } from 'components/layout';

export const App = () => (
  <Routes>
    <Route path="*" element={<NotFound />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Navigate to="/frontpage" />} />
      <Route path="/frontpage" element={<MainPage />}>
        <Route path=":id" element={<DetailPage />} />
      </Route>
    </Route>
  </Routes>
);
