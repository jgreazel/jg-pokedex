import styled from "styled-components";
import capitalize from "lodash.capitalize";

import usePokemon from "./usePokemon";

const Card = styled.div`
  width: 160px;
  height: 160px;
  background: #97bc62ff;
  text-align: center;
  border-radius: 8px;
  color: #2c5f2d;
`;

const PokemonCard = ({ pokemon, onClick }) => {
  const { pokemon: pokemonData, loading } = usePokemon(pokemon);

  if (loading) {
    return <Card>Loading...</Card>;
  }

  return (
    <Card onClick={() => onClick(pokemonData)}>
      <img src={pokemonData.sprites.front_default} alt={pokemon} />
      <h3>{capitalize(pokemon)}</h3>
    </Card>
  );
};

export default PokemonCard;
