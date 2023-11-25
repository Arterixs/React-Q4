import { RootState } from 'store';

export const searchValueSelector = (state: RootState) => state.search.value;
export const searchValueRequestSelector = (state: RootState) => state.search.valueRequest;

export const amountElemPageSelector = (state: RootState) => state.amountElemPage.amount;

export const planetsSelector = (state: RootState) => state.planets.value;
