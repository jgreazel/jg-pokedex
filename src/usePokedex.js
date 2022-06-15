import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const usePokedex = () => {
  const [pokedex, setPokedex] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPokedex = async () => {
      const P = new Pokedex();
      const resp = await P.getPokedexByName("original-sinnoh");
      setPokedex(resp);
      setLoading(false);
    };
    getPokedex().catch(console.error);
  }, []);

  return { pokedex, loading };
};

export default usePokedex;
