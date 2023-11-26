import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAKE_COMPONENT } from 'test/mocks';
import { describe, expect, it } from 'vitest';

describe('Search', () => {
  it('Component updates URL query parameter when page changes', async () => {
    const firstUrl = 'http://localhost:3000/#/frontpage?page=1&search=';
    const secondUrl = 'http://localhost:3000/#/frontpage?page=2&search=';
    const user = userEvent.setup();
    render(<FAKE_COMPONENT />);
    const btnNext = await screen.findByTestId('btn-next');
    await user.click(btnNext);
    expect(window.location.href).toEqual(secondUrl);
    const btnPrev = await screen.findByTestId('btn-prev');
    await user.click(btnPrev);
    expect(window.location.href).toEqual(firstUrl);
  });
});
