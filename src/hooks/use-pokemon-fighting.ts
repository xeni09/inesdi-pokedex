import { useEffect, useState, useMemo } from 'react';
import data from './mocks/pokemon-fighting.json';

interface TypeData {
  name: string;
  damage_relations: {
    weak_to: { name: string }[];
  };
}

export function usePokemonFighting(pokemonTypesInput: string[]) {
  const [weaknesses, setWeaknesses] = useState<string[]>([]);

  const pokemonTypes = useMemo(() => pokemonTypesInput, [pokemonTypesInput]);

  useEffect(() => {
    if (pokemonTypes.length === 0) {
      setWeaknesses([]);
      return;
    }

    try {
      const typeDataArray = data as TypeData[];
      const allWeaknesses: string[] = [];
      pokemonTypes.forEach(pokemonType => {
        const typeData = typeDataArray.find(type => type.name.toLowerCase() === pokemonType.toLowerCase());
        if (typeData) {
          const typeWeaknesses = typeData.damage_relations.weak_to.map((type: { name: string }) => type.name);
          allWeaknesses.push(...typeWeaknesses);
        }
      });
      setWeaknesses(allWeaknesses);
    } catch (error) {
      console.error("Error processing Pokemon fighting data:", error);
    }
  }, [pokemonTypes]); 
  return { weaknesses };
}