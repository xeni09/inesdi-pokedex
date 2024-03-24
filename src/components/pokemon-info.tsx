import React from 'react';
import { PokemonInfoProps } from '../models';




export const PokemonInfo: React.FC<PokemonInfoProps> = ({ selectedPokemon, weaknesses }) => {


  
  return (
    <div className="screen text-screen">
      <div className="info"><strong>Name:</strong>   {selectedPokemon && selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1)}</div> 
      <div className="info"><strong>Weight:</strong> {selectedPokemon && selectedPokemon.weight / 10} kg</div> 
      <div className="info"><strong>Height:</strong> {selectedPokemon && selectedPokemon.height / 10} m</div> 
      <div className="info"><strong>Type:</strong>  {selectedPokemon && selectedPokemon.types.map((type: { type: { name: string } }) => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(", ")}
      </div>
      <div className="info"><strong>Stats:</strong> {selectedPokemon && selectedPokemon.stats.map((stat: { stat: { name: string }, base_stat: number }, index: number) => (
        <div key={index} className="stats">{`${stat.stat.name}: ${stat.base_stat}`}</div>))}</div>
      <div className="info"><strong>Weaknesses: </strong>{weaknesses.join(', ')}
      </div>
    </div>
  );
}