export type PokedexTheme = "blue" | "red" | "yellow" | "green";
export type PokemonUri = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
  };
  url: string;
};

export type PokemonInfoProps = {
  selectedPokemon?: Pokemon;
  weaknesses: string[];
}

export type PokedexProps = {
  i: number;
  setI: React.Dispatch<React.SetStateAction<number>>;
}

// export type Pokedex2Props = {
//   i: number;
//   setI: React.Dispatch<React.SetStateAction<number>>;
// }