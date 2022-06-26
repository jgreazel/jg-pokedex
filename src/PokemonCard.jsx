import usePokemon from "./usePokemon";

const PokemonCard = ({ pokemon, onClick }) => {
  const { pokemon: pokemonData, loading } = usePokemon(pokemon);

  if (loading) {
    return <div className="btn card">Loading...</div>;
  }

  return (
    <label
      onClick={() => onClick(pokemonData)}
      for="my-drawer"
      className="btn h-28 drawer-button"
    >
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemon}
        className="h-20 w-20"
      />
      <h3 className="capitalize">{pokemon}</h3>
    </label>
  );
};

export default PokemonCard;
