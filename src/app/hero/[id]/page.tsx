import Carousel from "@/app/components/Carousel";

interface Props {
  params: {
    id: string;
  };
}

const HeroDetailsPage: React.FC<Props> = async ({ params: { id } }) => {
  // const heroes = await getHeroes();
  const heroes = { data: [] };
  return <Carousel heroes={heroes.data} activeId={id} />;
};

export default HeroDetailsPage;
