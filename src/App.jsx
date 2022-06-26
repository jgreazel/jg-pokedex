import { useState, useMemo } from "react";

import PokemonDrawer from "./PokemonDrawer";
import PokemonList from "./PokemonList";
import usePokedex from "./usePokedex";

function App() {
  const [drawerPokemon, setDrawerPokemon] = useState();
  const { pokedex, loading } = usePokedex();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <PokemonList
          pokemonEntries={pokedex.pokemon_entries}
          onCardClick={setDrawerPokemon}
        />
      </div>
      <div className="drawer-side">
        <label for="my-drawer" className="drawer-overlay" />
        {!!drawerPokemon && (
          <PokemonDrawer
            onClose={() => setDrawerPokemon(undefined)}
            pokemon={drawerPokemon}
          />
        )}
      </div>
    </div>
  );
}

export default App;
