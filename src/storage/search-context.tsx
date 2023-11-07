import { createContext, ReactNode, useCallback, useState } from 'react';
import { getPrevRequestFromLocal } from 'service/localStorageApi';

interface SearchContextState {
  searchValue: string;
  updateSearchValue: (value: string) => void;
}

export const SearchContext = createContext<SearchContextState>({
  searchValue: '',
  updateSearchValue: () => {},
});

export const SearchContextWrapper = ({ children }: { children: ReactNode }) => {
  const [searchValue, setSearchValue] = useState(() => getPrevRequestFromLocal());
  const updateSearchValue = useCallback((value: string) => setSearchValue(value), []);

  return (
    <SearchContext.Provider value={{ searchValue, updateSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
