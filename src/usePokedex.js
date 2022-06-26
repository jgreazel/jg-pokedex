import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const usePokedex = (region) => {
  const [pokedex, setPokedex] = useState();
  const [loading, setLoading] = useState(true);
  const P = new Pokedex();

  useEffect(() => {
    setLoading(true);
  }, [region]);

  useEffect(() => {
    if (!loading) return;
    const getPokedex = async (region) => {
      const resp = await P.getPokedexByName(region);
      setPokedex(resp);
      setLoading(false);
    };
    getPokedex(region).catch(console.error);
  }, [loading]);

  return { pokedex, loading };
};

export default usePokedex;
