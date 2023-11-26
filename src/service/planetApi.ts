import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Planet } from 'types/interface/api';

import { API } from './api';

export const planetApi = createApi({
  reducerPath: 'planetApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getPlanetById: builder.query<Planet, string>({
      query: (id) => `${id}`,
    }),
  }),
});

export const {
  useGetPlanetByIdQuery,
  util: { getRunningQueriesThunk },
} = planetApi;
