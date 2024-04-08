import styles from "./heroesList.module.scss";

import { spidermanFont } from "@/fonts";
import { Hero } from "@/interfaces/heroes";

interface Props {
  heroes: Hero[];
}

const HeroesList: React.FC<Props> = ({ heroes }) => {
  return (
    <>
      <h1 className={`${spidermanFont.className} ${styles.title}`}>
        Personagens
      </h1>
    </>
  );
};

export default HeroesList;
