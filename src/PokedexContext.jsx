import React from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const pokedex = new Pokedex({
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  offset: 0,
  limit: 100000,
  timeout: 10 * 1000,
  cache: true,
  cacheImages: true,
});
const PokedexContext = React.createContext(pokedex);

export { PokedexContext as default };
