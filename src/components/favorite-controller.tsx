import { useContext } from "react";
import { FavoritesContext } from '../contexts/favorites-context'; 
import { FaHeart } from "react-icons/fa"; 

export function FavoriteController({ pokemon }: { pokemon: any }) {
  const [favorites, setFavorites] = useContext(FavoritesContext);

  const toggleFavorite = () => {
    setFavorites((prevFavorites) => {
      let newFavorites;
      if (prevFavorites.some((fav) => fav.name === pokemon.name)) {
        newFavorites = prevFavorites.filter((fav) => fav.name !== pokemon.name);
      } else {
        if (prevFavorites.length < 7) {
          newFavorites = [...prevFavorites, pokemon];
        } else {
          alert('You can only have 7 favorite Pokemon.');
          newFavorites = prevFavorites;
        }
      }
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };
  if (!pokemon) return null; 
  return (
    <FaHeart 
      onClick={toggleFavorite}
      className={favorites.some(fav => fav.name === pokemon.name) ? 'favorite' : ''}
      style={{ color: favorites.some(fav => fav.name === pokemon.name) ? 'red' : 'grey' }}
    />
  );
}