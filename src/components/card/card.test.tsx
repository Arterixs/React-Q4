import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FAKE_COMPONENT, MOCK_PLANET } from 'test/mocks';
import { describe, expect, it } from 'vitest';

import { Card } from 'components/card';

describe('Card', () => {
  it.skip('Card component renders the relevant card data', () => {
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

  it.skip('Clicking on a card opens a detailed card component', async () => {
    const titleDetailPage = 'Details';
    const DEFAULT_CARDS = 10;
    const FINAL_AMOUNT_CARDS = 11;
    const user = userEvent.setup();
    render(<FAKE_COMPONENT />);

    const cards = await screen.findAllByTestId('card');
    expect(cards.length).toBe(DEFAULT_CARDS);

    await user.click(cards[0]);

    const isDetailPage = await screen.findByText(titleDetailPage);
    expect(isDetailPage).toBeInTheDocument();

    const updateCards = await screen.findAllByTestId('card');
    expect(updateCards.length).toBe(FINAL_AMOUNT_CARDS);
  });

  it.skip('Clicking triggers an additional API call to fetch detailed information', async () => {
    const user = userEvent.setup();
    render(<FAKE_COMPONENT />);

    const cards = await screen.findAllByTestId('card');

    await user.click(cards[0]);
  });
});
