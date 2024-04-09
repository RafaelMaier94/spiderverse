import styles from "./page.module.scss";

import HeroesList from "@/app/components/HeroesList";

const Home: React.FC = async () => {
  // const heroes = await getHeroes();
  const heroes = { data: [] };

  return (
    <main className={styles.main}>
      <HeroesList heroes={heroes.data} />
    </main>
  );
};

export default Home;
