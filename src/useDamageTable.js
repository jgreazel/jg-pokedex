import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const useDamageTable = (pokemon) => {
  const [damageTable, setDamageTable] = useState();
  const [loading, setLoading] = useState(true);

  let workingTypes = pokemon.types.map((type) => type.type.name);

  useEffect(() => {
    const damage = {
      normal: 1,
      fire: 1,
      water: 1,
      grass: 1,
      electric: 1,
      ice: 1,
      fighting: 1,
      poison: 1,
      ground: 1,
      flying: 1,
      psychic: 1,
      bug: 1,
      rock: 1,
      ghost: 1,
      dragon: 1,
      dark: 1,
      steel: 1,
      fairy: 1,
    };
    const getDamageTable = async () => {
      const P = new Pokedex();
      await workingTypes.forEach(async (type) => {
        const resp = await P.getTypeByName(type);
        resp.damage_relations.double_damage_from.forEach((t) => {
          damage[t.name] *= 2;
        });
        resp.damage_relations.half_damage_from.forEach((t) => {
          damage[t.name] /= 2;
        });
        resp.damage_relations.no_damage_from.forEach((t) => {
          damage[t.name] = 0;
        });
      });
      // ? i think its running twice, and the second time it's not sending the requests and just setting state to the default damage obj. why idk?
      setDamageTable(damage);
      setLoading(false);
    };
    getDamageTable().catch(console.error);
  }, [pokemon]);

  // todo: fix this, idk why it's not working
  console.log({
    damageTable,
    loading,
    array: damageTable ? Object.values(damageTable) : [],
  });
  return { damageTable, loading };
};

export default useDamageTable;
