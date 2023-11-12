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
    rotation_period: '231',
    orbital_period: '3041',
    diameter: '104651',
    climate: 'arid1',
    gravity: '1 standard1',
    terrain: 'bresent',
    population: '2000001',
    url: 'https://swapi.dev/api/planets/2/',
  },
  {
    name: 'Tatooi',
    rotation_period: '2323',
    orbital_period: '3014',
    diameter: '1046523',
    climate: 'arid23',
    gravity: '1 standard23',
    terrain: 'rezent23',
    population: '20000023',
    url: 'https://swapi.dev/api/planets/3/',
  },
  {
    name: 'Tatoo',
    rotation_period: '233',
    orbital_period: '3043',
    diameter: '104653',
    climate: 'arid3',
    gravity: '1 standard3r3',
    terrain: 'rezent23',
    population: '2000003',
    url: 'https://swapi.dev/api/planets/4/',
  },
  {
    name: 'Tato',
    rotation_period: '2345',
    orbital_period: '30445',
    diameter: '1046545',
    climate: 'arid45',
    gravity: '1 standard45',
    terrain: 'des45e',
    population: '20000045',
    url: 'https://swapi.dev/api/planets/5/',
  },
  {
    name: 'Tat',
    rotation_period: '235',
    orbital_period: '3045',
    diameter: '104655',
    climate: 'arid5',
    gravity: '1 standard5',
    terrain: 'des',
    population: '2000005',
    url: 'https://swapi.dev/api/planets/6/',
  },
  {
    name: 'Ta',
    rotation_period: '236789',
    orbital_period: '3046789',
    diameter: '104656789',
    climate: 'arid6789',
    gravity: '1 standard6789',
    terrain: 'de6789',
    population: '2000006789',
    url: 'https://swapi.dev/api/planets/7/',
  },
  {
    name: 'T',
    rotation_period: '23789',
    orbital_period: '304789',
    diameter: '10465789',
    climate: 'arid789',
    gravity: '1 standard789',
    terrain: 'de789',
    population: '200000789',
    url: 'https://swapi.dev/api/planets/8/',
  },
  {
    name: 'Tatooine1',
    rotation_period: '2389',
    orbital_period: '30489',
    diameter: '1046895',
    climate: 'ari89d',
    gravity: '1 sta89ndard',
    terrain: '89d',
    population: '20890000',
    url: 'https://swapi.dev/api/planets/9/',
  },
  {
    name: 'Tatooine2',
    rotation_period: '11911',
    orbital_period: '294',
    diameter: '19222',
    climate: 'ar9ide',
    gravity: '1 sta9ndardre',
    terrain: 'dese9rt1',
    population: '2000900',
    url: 'https://swapi.dev/api/planets/10/',
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

export async function mockTimeoutFetch(url: RequestInfo) {
  if (url.toString().startsWith(mockUrlPlanet)) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ok: true,
          status: 200,
          json: async () => ({ results: MOCK_PLANET }),
        });
      }, 2000);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({ count: 60, results: MOCK_PLANETS }),
      });
    }, 2000);
  });
}

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
