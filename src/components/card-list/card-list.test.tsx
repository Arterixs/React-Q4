import { render, screen } from '@testing-library/react';
import { FAKE_COMPONENT, MOCK_PLANETS } from 'test/mocks';
import { describe, expect, it } from 'vitest';

describe('Card list', () => {
  it('Component renders 10 cards', () => {
    const amountCards = 10;
    render(<FAKE_COMPONENT planets={MOCK_PLANETS} />);
    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(amountCards);
  });

  it('Appropriate message is displayed if no cards are present', () => {
    const TEST_MESSAGE = 'Unfortunately nothing was found for your search';
    render(<FAKE_COMPONENT planets={[]} />);
    expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
  });
});
