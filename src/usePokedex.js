import { useState, useEffect, useContext } from "react";
import PokedexContext from "./PokedexContext";

const usePokedex = (region) => {
  const [pokedex, setPokedex] = useState();
  const [loading, setLoading] = useState(true);
  const P = useContext(PokedexContext);

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
