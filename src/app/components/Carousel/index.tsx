"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import HeroDetails from "../HeroDetails";
import HeroPicture from "../HeroPicture";

import styles from "./carousel.module.scss";

import { Hero } from "@/interfaces/heroes";

enum enPosition {
  FRONT = 0,
  MIDDLE = 1,
  BACK = 2,
}
interface Props {
  heroes: Hero[];
  activeId: string;
}

const Carousel: React.FC<Props> = ({ heroes, activeId }) => {
  const [visibleItems, setVisibleItems] = useState<Hero[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(
    heroes.findIndex((hero) => hero.id === activeId) - 1
  );
  const [initialX, setInitialX] = useState<number>(0);

  const transitionAudio = useMemo(() => new Audio("/songs/transition.mp3"), []);

  const voicesAudio: Record<Hero["id"], HTMLAudioElement> = useMemo(
    () => ({
      "spider-man-616": new Audio("/songs/spider-man-616.mp3"),
      "mulher-aranha-65": new Audio("/songs/mulher-aranha-65.mp3"),
      "spider-man-1610": new Audio("/songs/spider-man-1610.mp3"),
      "sp-dr-14512": new Audio("/songs/sp-dr-14512.mp3"),
      "spider-ham-8311": new Audio("/songs/spider-ham-8311.mp3"),
      "spider-man-90214": new Audio("/songs/spider-man-90214.mp3"),
      "spider-man-928": new Audio("/songs/spider-man-928.mp3"),
    }),
    []
  );

  useEffect(() => {
    if (!visibleItems) return;
    transitionAudio.play();

    const voiceAudio = voicesAudio[visibleItems[enPosition.MIDDLE]?.id];
    if (!voiceAudio) return;
    voiceAudio.volume = 0.3;
    voiceAudio.play();
  }, [visibleItems, transitionAudio, voicesAudio]);

  useEffect(() => {
    const indexInArrayScope =
      ((activeIndex % heroes.length) + heroes.length) % heroes.length;
    const visibleItems = [...heroes, ...heroes].slice(
      indexInArrayScope,
      indexInArrayScope + 3
    );
    setVisibleItems(visibleItems);
  }, [activeIndex, heroes]);

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (!htmlElement || !visibleItems.length) return;
    const currentHeroId = visibleItems[enPosition.MIDDLE].id;

    htmlElement.style.backgroundImage = `url("/spiders/${currentHeroId}-background.png")`;
    htmlElement.classList.add("hero-page");

    return () => {
      htmlElement.classList.remove("hero-page");
    };
  }, [visibleItems]);

  if (!visibleItems) {
    return null;
  }

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setInitialX(event.clientX);
  };

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    if (!initialX) return;
    const finalX = event.clientX;
    const diffX = finalX - initialX;
    const newPosition = diffX > 0 ? -1 : 1;
    handleChangeActiveIndex(newPosition);
  };

  const handleChangeActiveIndex = (newDirection: number) => {
    setActiveIndex((prevActiveIndex) => prevActiveIndex + newDirection);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
        <div
          className={styles.wrapper}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.hero}
                initial={{ x: -1500, scale: 0.75 }}
                transition={{ duration: 0.8 }}
                animate={{ x: 0, ...getItemStyles(index) }}
                exit={{ x: 0, opacity: 0, scale: 1, left: "-20%" }}
              >
                <HeroPicture hero={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <motion.div
        className={styles.details}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
      >
        <HeroDetails data={visibleItems[enPosition.MIDDLE]} />
      </motion.div>
    </div>
  );
};

const getItemStyles = (position: enPosition) => {
  if (position === enPosition.FRONT) {
    return {
      zIndex: 3,
      filter: "blur(10px)",
      scale: 1.2,
    };
  }

  if (position === enPosition.MIDDLE) {
    return {
      zIndex: 2,
      left: 300,
      scale: 0.8,
      top: "-10%",
    };
  }

  return {
    zIndex: 1,
    filter: "blur(10px)",
    left: 160,
    top: "-20%",
    scale: 0.6,
    opacity: 0.8,
  };
};

export default Carousel;
