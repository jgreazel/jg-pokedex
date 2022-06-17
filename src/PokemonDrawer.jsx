import { useEffect } from "react";
import styled from "styled-components";
import capitalize from "lodash.capitalize";

import useDamageTable from "./useDamageTable";

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

const PokemonDrawer = ({ pokemon, onClose }) => {
  const { damageTable, loading } = useDamageTable(pokemon);

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
      {loading ? (
        <p>Loading Weaknesses...</p>
      ) : (
        <table>
          {Object.entries(damageTable).map((x) => (
            <tr>
              <td>{x[0]}</td>
              <td>{x[1]}</td>
            </tr>
          ))}
        </table>
      )}
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
