import { useEffect } from "react";
import styled from "styled-components";
import capitalize from "lodash.capitalize";

import DAMAGE_CHART from "./damageChart";

const Drawer = styled.div`
  position: fixed;
  right: 0;
  height: 98vh;
  width: 25vw;
  overflow-y: scroll;
`;

const getMoves = (pokemon) => {
  if (!pokemon.moves) return [];
  return pokemon.moves
    .map((m) => ({
      level: m.version_group_details[0].level_learned_at,
      name: m.move.name,
    }))
    .filter((m) => m.level !== 0)
    .sort((a, b) => a.level - b.level);
};

const getWeaknesses = (typeArr) => {
  const getDamageField = (from) =>
    typeArr.reduce(
      (dmg, acc, idx) => dmg * DAMAGE_CHART[`${from}`][`${typeArr[idx]}`],
      1
    );

  return {
    normal: getDamageField("normal"),
    fire: getDamageField("fire"),
    water: getDamageField("water"),
    electric: getDamageField("electric"),
    grass: getDamageField("grass"),
    ice: getDamageField("ice"),
    fighting: getDamageField("fighting"),
    poison: getDamageField("poison"),
    ground: getDamageField("ground"),
    flying: getDamageField("flying"),
    psychic: getDamageField("psychic"),
    bug: getDamageField("bug"),
    rock: getDamageField("rock"),
    ghost: getDamageField("ghost"),
    dragon: getDamageField("dragon"),
    dark: getDamageField("dark"),
    steel: getDamageField("steel"),
    fairy: getDamageField("fairy"),
  };
};

// think next thing (before styling) is to get evolution chains
// can use https://pokeapi.co/api/v2/evolution-chain/<id> where id == pokemon.id (pokemon prop)
// may only show if a level up evo for now

const PokemonDrawer = ({ pokemon, onClose }) => {
  const types = pokemon.types.map((type) => type.type.name);
  const weaknesses = getWeaknesses(types);

  return (
    <Drawer>
      <h2>{capitalize(pokemon.name)}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon} />
      <p>
        Type:{" "}
        {pokemon.types.map((t) => (
          <span key={t.type.name}>{t.type.name + ", "}</span>
        ))}
      </p>
      <table>
        {Object.entries(weaknesses).map((x) => (
          <tr>
            <td>{x[0]}</td>
            <td>{x[1]}</td>
          </tr>
        ))}
      </table>
      <table>
        <thead>Stats</thead>
        <tbody>
          {pokemon.stats.map((s, idx) => (
            <tr key={idx}>
              <td>{s.stat.name}</td>
              <td>{s.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      Abilities:
      {pokemon.abilities.map((a, idx) => (
        <>{a.ability.name + ", "}</>
      ))}
      <br />
      <table>
        <thead>Moves</thead>
        <tbody>
          <tr>
            <th>Level</th>
            <th>Name</th>
          </tr>
          {getMoves(pokemon).map((m, idx) => (
            <tr key={idx}>
              <td>{m.level}</td>
              <td>{m.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose}>Close</button>
    </Drawer>
  );
};

export default PokemonDrawer;
