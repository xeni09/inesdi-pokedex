import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition, usePokemonFighting } from "hooks";
import { useState, useMemo, useEffect, useContext} from "react";
import { FavoritesContext, useSelectedPokemon } from "contexts"; 
import { FavoriteController } from "./favorite-controller";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { Search } from './search';
import "./pokedex.css";
import { PokemonInfo } from "./pokemon-info";
import { PokedexProps } from 'models'; 


export const Pokedex: React.FC<PokedexProps> = () => { 
  const { theme } = useTheme();
  const { resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(() => {
    const savedIndex = localStorage.getItem('selectedPokemonIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
 
  const [isPokemonClicked, setIsPokemonClicked] = useState(false);
  const { pokemon: selectedPokemonFromList } = usePokemon(pokemonList[i]);

  const { selectedPokemon: clickedPokemon } = useSelectedPokemon();

  const selectedPokemon = isPokemonClicked ? clickedPokemon : selectedPokemonFromList;
    
  const pokemonTypes = useMemo(() => selectedPokemon ? selectedPokemon.types.map((type: { type: { name: string } }) => type.type.name) : [], [selectedPokemon]);

  const { pokemon: previousPokemon } = usePokemon(i > 0 ? pokemonList[i - 1] : pokemonList[pokemonList.length - 1]);
  const { weaknesses } = usePokemonFighting(pokemonTypes);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[(i + 1) % pokemonList.length]);
 
 
  const setIndex = (index: number) => {
    setI(index);
    setIsPokemonClicked(false);
  };


  const prev = () => {
    resetTransition();
    const prevIndex = i === 0 ? pokemonList.length - 1 : i - 1;
    setIndex(prevIndex);
  };
  
  const next = () => {
    resetTransition();
    const nextIndex = i === pokemonList.length - 1 ? 0 : (i + 1) % pokemonList.length;
    setIndex(nextIndex);
  };

  const [favorites] = useContext(FavoritesContext);

  useEffect(() => {
    localStorage.setItem('selectedPokemonIndex', i.toString());
  }, [i]);

  useEffect(() => {
    if (clickedPokemon) {
      setIsPokemonClicked(true);
    }
  }, [clickedPokemon]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
      <div className="screen main-screen">

          {selectedPokemon && (                       
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div>
            {selectedPokemon?.name}
            <span className="favorite-icon">
              <FavoriteController pokemon={selectedPokemon} />
            </span>
          </div>
        </div>
      </div>
      <div className="panel middle-panel">
      <PokemonInfo selectedPokemon={selectedPokemon ?? undefined} weaknesses={weaknesses} />
      </div>
      <div className="panel right-panel">
        <div className=" leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div>
        <Search pokemonList={pokemonList} setI={setIndex} />
        </div>
        <div className="screens-container">
          <div className="screen second-screen">
            {previousPokemon && <img src={previousPokemon.sprites.front_default} alt={previousPokemon.name} />}
          </div>
          <div className="screen second-screen">
            {nextPokemon && <img src={nextPokemon.sprites.front_default} alt={nextPokemon.name} />}
          </div>
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}
