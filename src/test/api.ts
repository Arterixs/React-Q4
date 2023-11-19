import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API } from 'service/api';

import { MOCK_PLANET, MOCK_PLANETS, mockUrlPlanet } from './mocks';

export const server = setupServer(
  ...[
    http.get(API, () => HttpResponse.json({ count: 60, results: MOCK_PLANETS })),
    http.get(mockUrlPlanet, () => HttpResponse.json(MOCK_PLANET)),
  ]
);
