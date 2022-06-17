import { useState, useMemo } from "react";
import styled from "styled-components";

import PokemonDrawer from "./PokemonDrawer";
import PokemonList from "./PokemonList";
import usePokedex from "./usePokedex";

const Layout = styled.div`
  display: grid;
  grid-template-columns: auto 0.25fr;
  grid-template-columns: ${({ isDrawerOpen }) =>
    isDrawerOpen ? "1fr 0.25fr" : "1fr"};
  font: 1rem "Roboto", sans-serif;
`;

function App() {
  const [drawerPokemon, setDrawerPokemon] = useState();
  const { pokedex, loading } = usePokedex();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout isDrawerOpen={!!drawerPokemon}>
      <PokemonList
        pokemonEntries={pokedex.pokemon_entries}
        onCardClick={setDrawerPokemon}
      />
      {!!drawerPokemon && (
        <PokemonDrawer
          onClose={() => setDrawerPokemon(undefined)}
          pokemon={drawerPokemon}
        />
      )}
    </Layout>
  );
}

export default App;
