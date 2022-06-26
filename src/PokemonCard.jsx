import usePokemon from "./usePokemon";

const PokemonCard = ({ pokemon, onClick }) => {
  const { pokemon: pokemonData, loading } = usePokemon(pokemon);

  return (
    <label
      onClick={() => onClick(pokemonData)}
      htmlFor="my-drawer"
      className="btn h-28 drawer-button"
    >
      {loading ? (
        <div
          className="radial-progress animate-spin"
          style={{ "--value": 30, "--size": "2rem" }}
        />
      ) : (
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemon}
          className="h-20 w-20"
        />
      )}
      <h3 className="capitalize">{pokemon}</h3>
    </label>
  );
};

export default PokemonCard;
