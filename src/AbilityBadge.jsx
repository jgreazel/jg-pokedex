import { useState, useEffect } from "react";
import { Pokedex } from "pokeapi-js-wrapper";

const AbilityBadge = ({ abilityName }) => {
  const [data, setData] = useState();

  const getAbility = async () => {
    const P = new Pokedex();
    const resp = await P.getAbilityByName(abilityName);
    const formattedResp = {
      effect: resp.effect_entries.find((x) => x.language.name == "en").effect,
      flavorText: resp.flavor_text_entries.find((x) => x.language.name === "en")
        .flavor_text,
    };
    setData(formattedResp);
  };

  return (
    <div className="dropdown w-full">
      <label
        onClick={() => {
          getAbility().catch(console.error);
        }}
        tabIndex={0}
        className="badge badge-outline capitalize hover:cursor-pointer hover:shadow-xl"
        key={abilityName}
      >
        {abilityName}
      </label>
      <div
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-xl shadow p-4"
      >
        {data ? (
          <div className="grid grid-cols-1 gap-2">
            <h3 className="font-bold capitalize">{abilityName}</h3>
            <p className="italic">{data.flavorText}</p>
            <p>{data.effect}</p>
          </div>
        ) : (
          <div
            className="radial-progress animate-spin"
            style={{ "--value": 30, "--size": "2rem" }}
          />
        )}
      </div>
    </div>
  );
};
export default AbilityBadge;
