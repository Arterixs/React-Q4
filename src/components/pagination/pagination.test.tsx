import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'app/index';
import { mockFetch } from 'test/mocks';
import { afterAll, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

describe('Search', () => {
  let fetchSpy: SpyInstance<[input: RequestInfo, init?: RequestInit | undefined], Promise<Response>>;

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('Component updates URL query parameter when page changes', async () => {
    const firstUrl = 'http://localhost:3000/#/frontpage?page=1&search=';
    const secondUrl = 'http://localhost:3000/#/frontpage?page=2&search=';
    const user = userEvent.setup();
    render(<App />, { wrapper: HashRouter });
    expect(window.location.href).toEqual(firstUrl);
    const btnNext = await screen.findByTestId('btn-next');
    await user.click(btnNext);
    expect(window.location.href).toEqual(secondUrl);
    const btnPrev = await screen.findByTestId('btn-prev');
    await user.click(btnPrev);
    expect(window.location.href).toEqual(firstUrl);
  });
});
