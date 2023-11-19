import { createContext, ReactNode, useCallback, useState } from 'react';
import { Planet } from 'types/interface/api';

interface ContextCardsState {
  planets: Planet[] | null;
  updatePlanets: (value: Planet[]) => void;
}

export const ContextCards = createContext<ContextCardsState>({
  planets: null,
  updatePlanets: () => {},
});

interface ContextDetailState {
  planet: Planet | null;
  updatePlanet: (value: Planet) => void;
}

export const ContextDetail = createContext<ContextDetailState>({
  planet: null,
  updatePlanet: () => {},
});

export const ApiContextWrapper = ({ children }: { children: ReactNode }) => {
  const [planets, setPlanets] = useState<Planet[] | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const updatePlanets = useCallback((value: Planet[]) => setPlanets(value), []);
  const updatePlanet = useCallback((value: Planet) => setPlanet(value), []);

  return (
    <ContextCards.Provider value={{ planets, updatePlanets }}>
      <ContextDetail.Provider value={{ planet, updatePlanet }}>{children}</ContextDetail.Provider>
    </ContextCards.Provider>
  );
};
