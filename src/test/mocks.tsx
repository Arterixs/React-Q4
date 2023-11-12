import { HashRouter, Route, Routes } from 'react-router-dom';
import { DetailPage } from 'pages/detail-page';
import { ContextCards, ContextDetail } from 'storage/api-context';
import { Planet } from 'types/interface/api';

import { CardList } from 'components/card-list';

export const MOCK_PLANETS = [
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
    name: 'Tatooin',
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
    name: 'Tatooi',
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
    name: 'Tatoo',
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
    name: 'Tato',
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
    name: 'Tat',
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
    name: 'Ta',
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
    name: 'T',
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
    name: 'Tatooine1',
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
    name: 'Tatooine2',
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

export const MOCK_PLANET = {
  name: 'Tatooine',
  rotation_period: '23',
  orbital_period: '304',
  diameter: '10465',
  climate: 'arid',
  gravity: '1 standard',
  terrain: 'desert',
  population: '200000',
  url: 'https://swapi.dev/api/planets/1/',
};

interface FakeComponentProps {
  planets: Planet[];
}

export const FAKE_COMPONENT = (props: FakeComponentProps) => {
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
        <Route path=":id" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
};

interface FakeFullComponentProps {
  planets: Planet[];
  planet: Planet;
}

export const FAKE_FULL_COMPONENT = (props: FakeFullComponentProps) => {
  const mockFunction = () => {};
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ContextCards.Provider value={{ planets: props.planets, updatePlanets: mockFunction }}>
              <ContextDetail.Provider value={{ planet: props.planet, updatePlanet: mockFunction }}>
                <CardList clickCard={() => {}} hasError={false} />
              </ContextDetail.Provider>
            </ContextCards.Provider>
          }
        />
        <Route path=":id" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
};

export const mockUrlPlanet = 'https://swapi.dev/api/planets/1/';
export const mockUrlAllPlanets = 'https://swapi.dev/api/planets/?page=1';

export async function mockFetch(url: RequestInfo) {
  if (url.toString().startsWith(mockUrlPlanet)) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: async () => ({ results: MOCK_PLANET }),
    });
  }

  return Promise.resolve({
    ok: true,
    status: 200,
    json: async () => ({ count: 60, results: MOCK_PLANETS }),
  });
}
