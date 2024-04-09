"use client";

import { useEffect, useState } from "react";

import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./carousel.module.scss";

import { Hero } from "@/interfaces/heroes";

interface Props {
  heroes: Hero[];
  activeId: string;
}

const Carousel: React.FC<Props> = ({ heroes, activeId }) => {
  const [visibleItems, setVisibleItems] = useState<Hero[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId)
  );

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % heroes.length) + heroes.length) % heroes.length;
    const visibleItems = [...heroes, ...heroes].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );
    setVisibleItems(visibleItems);
  }, [activeIndex, heroes]);

  if (!visibleItems) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div className={styles.wrapper}>
          {visibleItems.map((item) => (
            <div key={item.id} className={styles.hero}>
              <HeroPicture hero={item} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.details}>
        <HeroDetails data={heroes[0]} />
      </div>
    </div>
  );
};

export default Carousel;
