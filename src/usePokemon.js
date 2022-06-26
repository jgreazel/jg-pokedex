import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const usePokemon = (pokemonName) => {
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokemon = async () => {
      const P = new Pokedex();
      const resp = await P.getPokemonByName(pokemonName);
      setPokemon(resp);
      setLoading(false);
    };
    getPokemon().catch((e) => {
      setError(e.message);
    });
  }, []);

  return { pokemon, loading, error };
};

export default usePokemon;
