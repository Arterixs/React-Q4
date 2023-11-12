import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MainPage } from 'pages/main-page';
import { ApiContextWrapper } from 'storage/api-context';
import { mockFetch } from 'test/mocks';
import { afterEach, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { Layout } from 'components/layout';

import { NotFound } from '.';

describe('Page 404', () => {
  let fetchSpy: SpyInstance;

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
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
        element: (
          <ApiContextWrapper>
            <MainPage />
          </ApiContextWrapper>
        ),
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
