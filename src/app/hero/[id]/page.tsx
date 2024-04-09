import Carousel from "@/app/components/Carousel";
import { getHeroes } from "@/app/services";

interface Props {
  params: {
    id: string;
  };
}

const HeroDetailsPage: React.FC<Props> = async ({ params: { id } }) => {
  const heroes = await getHeroes();

  return <Carousel heroes={heroes.data} activeId={id} />;
};

export default HeroDetailsPage;
