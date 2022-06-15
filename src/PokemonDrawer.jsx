import { useState, useEffect } from "react";
import capitalize from "lodash.capitalize";

const PokemonDrawer = ({ pokemon }) => (
  <div>
    <h2>{capitalize(pokemon.name)}</h2>
    <img src={pokemon.sprites.front_default} alt={pokemon} />
    <p>
      Type:{" "}
      {pokemon.types.map((t) => (
        <span>{t.type.name}</span>
      ))}
    </p>
  </div>
);

export default PokemonDrawer;
