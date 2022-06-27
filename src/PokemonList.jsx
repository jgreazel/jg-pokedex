import React from "react";

import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemonEntries, onCardClick }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 w-full sm:w-1/2 mx-auto">
    {pokemonEntries.map((p, idx) => (
      <PokemonCard
        key={`${idx}-${p.pokemon_species.name}`}
        pokemon={p.pokemon_species.name}
        onClick={(p) => onCardClick(p)}
      />
    ))}
  </div>
);

export default React.memo(PokemonList);
