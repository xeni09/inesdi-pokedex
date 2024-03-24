// FavoritesContext.tsx
import { createContext } from 'react';
import { Pokemon } from '../models'; 

export const FavoritesContext = createContext<[Pokemon[], React.Dispatch<React.SetStateAction<Pokemon[]>>]>([[], () => {}]);