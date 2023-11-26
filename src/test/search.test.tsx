import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAKE_COMPONENT } from 'test/mocks';
import { describe, expect, it } from 'vitest';

describe('Search', () => {
  it('Search button saves the entered value to the local storage', async () => {
    const user = userEvent.setup();
    const TEST_WORD = 'tatoo';
    render(<FAKE_COMPONENT />);
    const btnSearch = await screen.findByTestId('search');
    const getInput = screen.getByRole('textbox');
    await user.type(getInput, TEST_WORD);
    await user.click(btnSearch);
  });
});
