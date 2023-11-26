import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';

import '@testing-library/jest-dom';

import { server } from './api';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  cleanup();
});

afterAll(() => server.close());
