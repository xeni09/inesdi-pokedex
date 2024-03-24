import React, { useState } from 'react';
import './search.css';

interface SearchProps {
  pokemonList: any[];
  setI: (index: number) => void;
  setSelectedPokemon: (pokemon: any) => void;
}

export const Search: React.FC<SearchProps> = ({ pokemonList, setI, setSelectedPokemon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [placeholder, setPlaceholder] = useState('Search Pokemon');
  const [searchFailed, setSearchFailed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPokemonList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filteredPokemonList.length > 0) {
      setI(pokemonList.indexOf(filteredPokemonList[0]));
      setSelectedPokemon(null); // Reset the clicked Pokemon
      setPlaceholder('Search your Pokemon');
      setSearchFailed(false);
    } else {
      setSearchTerm('');
      setPlaceholder('Pokemon not found. Try again!');
      setSearchFailed(true);
    }
  };

  return (
    <form className="searchPokemon" onSubmit={handleSearch}>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder={placeholder} className={searchFailed ? 'error' : ''} />
      <button type="submit">Reset/Search</button>
    </form>
  );
};