import { createContext, useState, useContext } from 'react';
import { Pokemon } from 'models'; 

interface SelectedPokemonContextProps {
  selectedPokemon: Pokemon | null;
  setSelectedPokemon: (pokemon: Pokemon | null) => void;
}

export const SelectedPokemonContext = createContext<SelectedPokemonContextProps | undefined>(undefined);

export const SelectedPokemonProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  return (
    <SelectedPokemonContext.Provider value={{ selectedPokemon, setSelectedPokemon }}>
      {children}
    </SelectedPokemonContext.Provider>
  );
}

export const useSelectedPokemon = (): SelectedPokemonContextProps => {
  const context = useContext(SelectedPokemonContext);
  if (!context) {
    throw new Error('useSelectedPokemon must be used within a SelectedPokemonProvider');
  }
  return context;
}