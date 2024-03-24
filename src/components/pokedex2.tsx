// Pokedex2.tsx
import c from 'classnames';
import "./pokedex2.css";
import { useContext } from 'react'; 
import { FavoritesContext, useTheme, useSelectedPokemon } from "contexts"; 
import { Pokemon } from 'models'; 
import { usePokemonList } from "hooks";



interface Pokedex2Props {
  setI: (index: number) => void;
}



export const Pokedex2: React.FC<Pokedex2Props> = ({ setI }) => { 
  const { theme } = useTheme();
  const [favorites, setFavorites] = useContext(FavoritesContext);
  const { setSelectedPokemon } = useSelectedPokemon();
  const { pokemonList } = usePokemonList();

  const handleFavoriteClick = (pokemon: Pokemon) => {
    console.log('clicked', pokemon);
    setSelectedPokemon(pokemon);
    const index = pokemonList.findIndex((p) => p.name === pokemon.name);
    if (index !== -1) {
      setI(index);
    }
  };

  return (
    <div className={c("pokedex2", `pokedex-${theme}`)}>
      <div className="title-favorite">
        <h1>Your favorite pokemons</h1>
        <button onClick={() => setFavorites([])}>Clear Favorites</button>
      </div>

      <div className="selection-panel">
        {favorites.map((pokemon: Pokemon) => (
          <div key={pokemon.name} className='pokemon-items' onClick={() => handleFavoriteClick(pokemon)}>
            <img
              className="pokemon-image"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
            <div className="pokemon-name" 
            style={{ textTransform: 'capitalize' }}>{pokemon.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}