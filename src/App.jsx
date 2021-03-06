import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

import PokedexContext from "./PokedexContext";
import PokemonDrawer from "./PokemonDrawer";
import PokemonList from "./PokemonList";
import Navbar from "./Navbar";
import usePokedex from "./usePokedex";

function App() {
  const [region, setRegion] = useState(
    localStorage.getItem("jg-pokedex:region") || "kanto"
  );
  const [drawerPokemon, setDrawerPokemon] = useState();
  const [filter, setFilter] = useState("");
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

  const filteredPokemon = pokedex.pokemon_entries.filter((x) =>
    x.pokemon_species.name.includes(filter)
  );

  return (
    <PokedexContext.Provider
      value={
        new Pokedex({
          protocol: "https",
          hostName: "pokeapi.co",
          versionPath: "/api/v2/",
          offset: 0,
          limit: 100000,
          timeout: 10 * 1000,
          cache: true,
          cacheImages: true,
        })
      }
    >
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar
            onNavChange={setRegion}
            onFilterChange={setFilter}
            filterValue={filter}
          />
          <PokemonList
            pokemonEntries={filteredPokemon}
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
    </PokedexContext.Provider>
  );
}

export default App;
