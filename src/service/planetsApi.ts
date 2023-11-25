import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PlanetsRequest } from 'types/interface/api';

import { API } from './api';

interface QueryGetPlanets {
  page: string;
  namePlanet?: string;
}

export const planetsApi = createApi({
  reducerPath: 'planetsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    getPlanets: builder.query<PlanetsRequest, QueryGetPlanets>({
      query: ({ page, namePlanet }) => (namePlanet ? `?search=${namePlanet}&page=${page}` : `?page=${page}`),
    }),
  }),
});

export const { useGetPlanetsQuery } = planetsApi;
