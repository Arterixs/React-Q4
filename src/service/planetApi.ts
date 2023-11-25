import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Planet } from 'types/interface/api';

import { API } from './api';

export const planetApi = createApi({
  reducerPath: 'planetApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getPlanetById: builder.query<Planet, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetPlanetByIdQuery } = planetApi;
