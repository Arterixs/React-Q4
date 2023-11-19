import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from 'pages/main-page';
import { server } from 'test/api';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

import { Layout } from 'components/layout';

import { NotFound } from '.';

describe('Page 404', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('404 page is displayed when navigating to an invalid route', async () => {
    const PAGE_404 = 'Page 404';
    const routes = [
      {
        path: '/',
        element: <Layout />,
      },
      {
        path: '/frontpage',
        element: <MainPage />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/fff'],
      initialIndex: 1,
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => screen.getByRole('heading'));
    expect(screen.getByRole('heading').textContent).toBe(PAGE_404);
  });
});
