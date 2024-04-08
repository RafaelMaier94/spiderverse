import { Hero } from "@/interfaces/heroes";

interface Props {
  heroes: Hero[];
}

const HeroesList: React.FC<Props> = ({ heroes }) => {
  return <h1>Personagens</h1>;
};

export default HeroesList;
