import { HashRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { ContextCards } from 'storage/api-context';
import { Planet } from 'types/interface/api';
import { describe, expect, it } from 'vitest';

import { CardList } from 'components/card-list';

const MOCK_PLANETS = [
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
  {
    name: 'Tatooine',
    rotation_period: '23',
    orbital_period: '304',
    diameter: '10465',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    population: '200000',
    url: 'https://swapi.dev/api/planets/1/',
  },
];

interface FakeComponentProps {
  planets: Planet[];
}

const FAKE_COMPONENT = (props: FakeComponentProps) => {
  const mockFunction = () => {};
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ContextCards.Provider value={{ planets: props.planets, updatePlanets: mockFunction }}>
              <CardList clickCard={() => {}} hasError={false} />
            </ContextCards.Provider>
          }
        />
      </Routes>
    </HashRouter>
  );
};

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
