import { useEffect } from "react";

import DAMAGE_CHART from "./damageChart";

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

const PokemonDrawer = ({ pokemon, onClose }) => {
  const types = pokemon.types.map((type) => type.type.name);
  const weaknesses = getWeaknesses(types);

  return (
    <div className="overflow-y-auto w-5/6 sm:w-1/2 lg:w-1/4 bg-base-100 p-8 rounded-xl grid grid-cols-1 gap-2">
      <h1 className="capitalize font-bold text-xl">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon} />
      <div className="flex">
        {pokemon.types.map((t) => (
          // todo add conditional colors per types
          <div
            className="badge badge-outline badge-lg capitalize"
            key={t.type.name}
          >
            {t.type.name}
          </div>
        ))}
      </div>

      <div>
        <h2 className="font-bold">Abilities</h2>
        <div>
          {pokemon.abilities.map((a) => (
            <div
              className="badge badge-outline capitalize"
              key={a.ability.name}
            >
              {a.ability.name}
            </div>
          ))}
        </div>
      </div>

      <div className="divider" />

      <div>
        <h2 className="font-bold">Weakness Multipliers</h2>
        <div className="flex">
          <table className="table table-compact table-zebra w-1/2">
            <tbody>
              {Object.entries(weaknesses)
                .slice(0, 9)
                .map((x) => (
                  <tr>
                    <td className="capitalize">{x[0]}</td>
                    <td>{x[1]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="divider divider-horizontal" />
          <table className="table table-compact table-zebra w-1/2">
            <tbody>
              {Object.entries(weaknesses)
                .slice(9)
                .map((x) => (
                  <tr>
                    <td className="capitalize">{x[0]}</td>
                    <td>{x[1]}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="divider" />

      <div>
        <h2 className="font-bold">Base Stats</h2>
        {pokemon.stats.map((s, idx) => (
          <div>
            <div className="capitalize">{`${s.stat.name}: ${s.base_stat}`}</div>
            <progress
              className="progress progress-primary"
              value={s.base_stat}
              max="255"
            />
          </div>
        ))}
      </div>

      <div className="divider" />

      <div>
        <h2 className="font-bold">Moves</h2>
        <table className="table table-compact table-zebra w-full">
          <tbody>
            <tr>
              <th>Level</th>
              <th>Name</th>
            </tr>
            {getMoves(pokemon).map((m, idx) => (
              <tr key={idx}>
                <td>{m.level}</td>
                <td className="capitalize">{m.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonDrawer;
