import { Hero } from "@/interfaces/heroes";

export const getHeroes = async (): Promise<{ data: Hero[] }> => {
  const response = await fetch(`${process.env.DOMAIN_ORIGIN}/api/heroes`);
  if (!response.ok) {
    throw new Error("Failed to request heroes list");
  }
  return response.json();
};
