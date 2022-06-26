import { useState, useEffect } from "react";

import PokemonDrawer from "./PokemonDrawer";
import PokemonList from "./PokemonList";
import Navbar from "./Navbar";
import usePokedex from "./usePokedex";

function App() {
  const [region, setRegion] = useState(
    localStorage.getItem("jg-pokedex:region") || "kanto"
  );
  const [drawerPokemon, setDrawerPokemon] = useState();
  const { pokedex, loading } = usePokedex(region);

  useEffect(() => {
    localStorage.setItem("jg-pokedex:region", region);
  }, [region]);

  if (loading) {
    return (
      <div>
        <Navbar onNavChange={setRegion} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div
            className="radial-progress animate-spin text-primary"
            style={{ "--value": 30 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Navbar onNavChange={setRegion} />
        <PokemonList
          pokemonEntries={pokedex.pokemon_entries}
          onCardClick={setDrawerPokemon}
        />
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay" />
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
