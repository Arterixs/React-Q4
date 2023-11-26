import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAKE_COMPONENT } from 'test/mocks';
import { describe, expect, it } from 'vitest';

describe('Card list', () => {
  it.skip('Component renders 10 cards', async () => {
    const amountCards = 10;
    render(<FAKE_COMPONENT />);
    await waitFor(() => {
      const cards = screen.getAllByTestId('card');
      expect(cards.length).toBe(amountCards);
    });
  });

  it.skip('Appropriate message is displayed if no cards are present', async () => {
    const user = userEvent.setup();
    const TEST_MESSAGE = 'Unfortunately nothing was found for your search';
    render(<FAKE_COMPONENT />);
    const btnSearch = await screen.findByTestId('search');
    const getInput = screen.getByRole('textbox');
    await user.type(getInput, '0000');
    await user.click(btnSearch);
    expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
  });
});
