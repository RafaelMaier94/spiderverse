import styles from "./page.module.scss";

import HeroesList from "@/app/components/HeroesList";
import { Hero } from "@/interfaces/heroes";

const getHeroes = async (): Promise<{ data: Hero[] }> => {
  const response = await fetch(`${process.env.DOMAIN_ORIGIN}/api/heroes`);
  if (!response.ok) {
    throw new Error("Failed to request heroes list");
  }
  return response.json();
};

const Home: React.FC = async () => {
  const heroes = await getHeroes();

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes.data} />;
    </main>
  );
};

export default Home;
