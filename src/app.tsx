import { ThemeProvider } from "contexts/theme-context";
import { Pokedex } from "components/pokedex";
import { Pokedex2 } from "components/pokedex2";
import { FavoritesContext, SelectedPokemonProvider } from 'contexts';
import { useLocalStorage } from 'hooks/use-local-storage';
import { Pokemon } from 'models';
import { useState } from 'react';
   


export function App() {
  const [favorites, setFavorites] = useLocalStorage<Pokemon[]>('favorites', []);
  const [i, setI] = useState(0);

  return (
    <main>
      <FavoritesContext.Provider value={[favorites, setFavorites]}>
        <ThemeProvider>
          <SelectedPokemonProvider> 
          <Pokedex i={i} setI={setI} />
            {favorites.length > 0 && 
            
            <Pokedex2 setI={setI} />}
          </SelectedPokemonProvider> 
        </ThemeProvider>
      </FavoritesContext.Provider>
    </main>
  );
}