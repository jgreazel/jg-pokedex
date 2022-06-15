import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const usePokemon = (pokemonName) => {
  const [pokemon, setPokemon] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      const P = new Pokedex();
      const resp = await P.getPokemonByName(pokemonName);
      setPokemon(resp);
      setLoading(false);
    };
    getPokemon().catch(console.error);
  }, []);

  return { pokemon, loading };
};

export default usePokemon;
