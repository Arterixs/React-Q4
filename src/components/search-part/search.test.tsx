import { HashRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'app/index';
import { KEY_REQUEST } from 'service/api';
import { getPrevRequestFromLocal } from 'service/localStorageApi';
import { mockFetch } from 'test/mocks';
import { afterEach, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

describe('Search', () => {
  let fetchSpy: SpyInstance<[input: RequestInfo, init?: RequestInit | undefined], Promise<Response>>;
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(mockFetch);
  });

  afterEach(() => {
    fetchSpy.mockRestore();
    localStorage.clear();
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  it('Search button saves the entered value to the local storage', async () => {
    const user = userEvent.setup();
    const TEST_WORD = 'tatoo';
    render(<App />, { wrapper: HashRouter });
    const btnSearch = await screen.findByTestId('search');
    const getInput = screen.getByRole('textbox');
    await user.type(getInput, TEST_WORD);
    await user.click(btnSearch);
    expect(setItemSpy).toHaveBeenCalledWith(KEY_REQUEST, TEST_WORD);
    expect(getPrevRequestFromLocal()).toBe(TEST_WORD);
  });

  it('Component retrieves the value from the local storage upon mounting', async () => {
    const TEST_WORD = 'tatooine';
    const user = userEvent.setup();
    const { rerender } = render(<App />, { wrapper: HashRouter });
    const btnSearch = await screen.findByTestId('search');
    const getInput = screen.getByRole('textbox');
    await user.type(getInput, TEST_WORD);
    await user.click(btnSearch);
    expect(setItemSpy).toHaveBeenCalledWith(KEY_REQUEST, TEST_WORD);

    rerender(<App />);
    expect(getItemSpy).toHaveBeenCalledWith(KEY_REQUEST);
    expect(getPrevRequestFromLocal()).toBe(TEST_WORD);
  });
});
