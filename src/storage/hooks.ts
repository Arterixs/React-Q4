import { useContext } from 'react';

import { ContextCards, ContextDetail } from './api-context';
import { SearchContext } from './search-context';


export const useSearchContext = () => useContext(SearchContext);

export const useCardsContext = () => useContext(ContextCards);

export const useDetailContext = () => useContext(ContextDetail);

