import React from "react";
import styled from "styled-components";

import PokemonCard from "./PokemonCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  width: fit-content;
`;

const PokemonList = ({ pokemonEntries, onCardClick }) => (
  <Grid>
    {pokemonEntries.map((p, idx) => (
      <PokemonCard
        key={idx}
        pokemon={p.pokemon_species.name}
        onClick={(p) => onCardClick(p)}
      />
    ))}
  </Grid>
);

export default React.memo(PokemonList);
