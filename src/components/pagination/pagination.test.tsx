import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from 'test/api';
import { FAKE_COMPONENT } from 'test/mocks';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';

describe('Search', () => {
  beforeAll(() => server.listen());

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('Component updates URL query parameter when page changes', async () => {
    const firstUrl = 'http://localhost:3000/#/frontpage?page=1&search=';
    const secondUrl = 'http://localhost:3000/#/frontpage?page=2&search=';
    const user = userEvent.setup();
    render(<FAKE_COMPONENT />, { wrapper: HashRouter });
    const btnNext = await screen.findByTestId('btn-next');
    await user.click(btnNext);
    expect(window.location.href).toEqual(secondUrl);
    const btnPrev = await screen.findByTestId('btn-prev');
    await user.click(btnPrev);
    expect(window.location.href).toEqual(firstUrl);
  });
});
