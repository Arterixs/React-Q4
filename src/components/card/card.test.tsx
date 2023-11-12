import { HashRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from 'app/index';
import { MOCK_PLANET, mockFetch, mockTimeoutFetch, mockUrlAllPlanets, mockUrlPlanet } from 'test/mocks';
import { afterAll, afterEach, beforeEach, describe, expect, it, SpyInstance, vi } from 'vitest';

import { Card } from 'components/card';

describe('Card', () => {
  let fetchSpy: SpyInstance;

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    fetchSpy.mockRestore();
  });

  it('Card component renders the relevant card data', () => {
    const {
      name,
      terrain,
      climate,
      diameter,
      gravity,
      population,
      orbital_period: orbitalPeriod,
      rotation_period: rotationPeriod,
    } = MOCK_PLANET;
    render(<Card planet={MOCK_PLANET} />);
    const checkName = screen.getByText(name);
    const checkTerrain = screen.getByText(terrain);
    const checkClimate = screen.getByText(climate);
    const checkDiameter = screen.getByText(diameter);
    const checkGravity = screen.getByText(gravity);
    const checkPopulation = screen.getByText(population);
    const checkOrbital = screen.getByText(orbitalPeriod);
    const checkRotation = screen.getByText(rotationPeriod);
    expect(checkName).toBeInTheDocument();
    expect(checkTerrain).toBeInTheDocument();
    expect(checkClimate).toBeInTheDocument();
    expect(checkDiameter).toBeInTheDocument();
    expect(checkGravity).toBeInTheDocument();
    expect(checkPopulation).toBeInTheDocument();
    expect(checkOrbital).toBeInTheDocument();
    expect(checkRotation).toBeInTheDocument();
  });

  it('Clicking on a card opens a detailed card component', async () => {
    const titleDetailPage = 'Details';
    const DEFAULT_CARDS = 10;
    const FINAL_AMOUNT_CARDS = 11;
    const user = userEvent.setup();
    render(<App />, { wrapper: HashRouter });
    expect(fetch).toHaveBeenCalledWith(mockUrlAllPlanets);

    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(DEFAULT_CARDS);

    await user.click(cards[0]);
    expect(fetch).toHaveBeenCalledWith(mockUrlPlanet);

    const isDetailPage = await screen.findByText(titleDetailPage);
    expect(isDetailPage).toBeInTheDocument();

    const updateCards = await screen.findAllByTestId('card');
    expect(updateCards.length).toBe(FINAL_AMOUNT_CARDS);
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: HashRouter });
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(mockUrlAllPlanets);

    const cards = await screen.findAllByTestId('card');

    await user.click(cards[0]);

    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith(mockUrlPlanet);
  });
});

describe('Detail card', () => {
  let fetchSpy: SpyInstance;

  beforeEach(() => {
    fetchSpy = vi.spyOn(window, 'fetch').mockImplementation(mockTimeoutFetch);
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    fetchSpy.mockRestore();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('Loading indicator is displayed while fetching data', async () => {
    const user = userEvent.setup({ advanceTimers: (ms) => vi.advanceTimersByTime(ms) });
    render(<App />, { wrapper: HashRouter });
    expect(fetch).toHaveBeenCalled();
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
    await act(() => vi.runAllTimers());

    expect(() => screen.getByTestId('loader')).toThrow();

    const cards = await screen.findAllByTestId('card');

    await user.click(cards[0]);

    expect(fetch).toHaveBeenCalled();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    await act(() => vi.runAllTimers());
    expect(() => screen.getByTestId('loader')).toThrow();
  });

  it('Detailed card component correctly displays the detailed card data;', async () => {
    const {
      terrain,
      climate,
      diameter,
      gravity,
      population,
      orbital_period: orbitalPeriod,
      rotation_period: rotationPeriod,
    } = MOCK_PLANET;
    const FINAL_AMOUNT_CARDS = 11;

    const user = userEvent.setup();

    render(<App />, { wrapper: HashRouter });
    expect(fetch).toHaveBeenCalledWith(mockUrlAllPlanets);

    await act(() => vi.runAllTimers());

    expect(() => screen.getByTestId(`details-1`)).toThrow();

    const cards = await screen.findAllByTestId('card');
    await user.click(cards[0]);

    await act(() => vi.runAllTimers());
    expect(fetch).toHaveBeenCalledWith(mockUrlPlanet);

    const isDetailPage = await screen.findByTestId(`details-1`);
    expect(isDetailPage).toBeInTheDocument();

    const updateCards = await screen.findAllByTestId('card');
    expect(updateCards.length).toBe(FINAL_AMOUNT_CARDS);

    const checkTerrain = screen.getByText(terrain);
    const checkClimate = screen.getByText(climate);
    const checkDiameter = screen.getByText(diameter);
    const checkGravity = screen.getByText(gravity);
    const checkPopulation = screen.getByText(population);
    const checkOrbital = screen.getByText(orbitalPeriod);
    const checkRotation = screen.getByText(rotationPeriod);
    expect(checkTerrain).toBeInTheDocument();
    expect(checkClimate).toBeInTheDocument();
    expect(checkDiameter).toBeInTheDocument();
    expect(checkGravity).toBeInTheDocument();
    expect(checkPopulation).toBeInTheDocument();
    expect(checkOrbital).toBeInTheDocument();
    expect(checkRotation).toBeInTheDocument();
  });

  it('Clicking triggers an additional API call to fetch detailed information', async () => {
    const titleDetailPage = 'Details';
    const DEFAULT_CARDS = 10;
    const user = userEvent.setup();
    render(<App />, { wrapper: HashRouter });
    expect(fetch).toHaveBeenCalledWith(mockUrlAllPlanets);
    await act(() => vi.runAllTimers());

    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(DEFAULT_CARDS);

    await user.click(cards[0]);
    expect(fetch).toHaveBeenCalledWith(mockUrlPlanet);
    await act(() => vi.runAllTimers());

    const isDetailPage = await screen.findByText(titleDetailPage);
    expect(isDetailPage).toBeInTheDocument();

    const buttonClose = screen.getByTestId('close');
    await user.click(buttonClose);
    await act(() => vi.runAllTimers());
    expect(() => screen.getByTestId(`details-1`)).toThrow();
  });
});
