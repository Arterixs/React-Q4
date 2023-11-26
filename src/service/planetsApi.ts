import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { PlanetsRequest } from 'types/interface/api';

import { API } from './api';

interface QueryGetPlanets {
  page: string;
  namePlanet?: string;
}

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getPlanets: builder.query<PlanetsRequest, QueryGetPlanets>({
      query: ({ page, namePlanet }) => (namePlanet ? `?search=${namePlanet}&page=${page}` : `?page=${page}`),
    }),
  }),
});

export const {
  useGetPlanetsQuery,
  util: { getRunningQueriesThunk },
} = planetsApi;
