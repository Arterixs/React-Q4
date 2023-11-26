import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API } from 'service/api';

import { MOCK_PLANET, MOCK_PLANETS, mockUrlPlanet } from './mocks';

export const server = setupServer(
  ...[
    http.get(API, ({ request }) => {
      const isEqual = request.url === 'https://swapi.dev/api/planets/?search=0000&page=1';
      return HttpResponse.json({ count: 60, results: isEqual ? [] : MOCK_PLANETS });
    }),
    http.get(mockUrlPlanet, () => HttpResponse.json(MOCK_PLANET)),
  ]
);
