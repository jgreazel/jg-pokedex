import { useState, useMemo } from "react";
import styled from "styled-components";

import PokemonCard from "./PokemonCard";
import PokemonDrawer from "./PokemonDrawer";
import usePokedex from "./usePokedex";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 0.25fr;
  grid-template-columns: ${({ isDrawerOpen }) =>
    isDrawerOpen ? "1fr 0.25fr" : "1fr"};
  font: 1rem "Roboto", sans-serif;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 0 auto;
  width: fit-content;
`;

function App() {
  const [drawerPokemon, setDrawerPokemon] = useState();
  const { pokedex, loading } = usePokedex();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout isDrawerOpen={!!drawerPokemon}>
      <Grid>
        {pokedex.pokemon_entries.map((p, idx) => (
          <PokemonCard
            key={idx}
            pokemon={p.pokemon_species.name}
            onClick={(p) => setDrawerPokemon(p)}
          />
        ))}
      </Grid>
      {!!drawerPokemon && <PokemonDrawer pokemon={drawerPokemon} />}
    </Layout>
  );
}

export default App;
