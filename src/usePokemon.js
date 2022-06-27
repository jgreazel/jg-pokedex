import { useState, useEffect, useContext } from "react";
import PokedexContext from "./PokedexContext";

const usePokemon = (pokemonName) => {
  const [pokemon, setPokemon] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const P = useContext(PokedexContext);

  useEffect(() => {
    const getPokemon = async () => {
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
