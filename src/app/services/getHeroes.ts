import { Hero } from "@/interfaces/heroes";

export const getHeroes = async (): Promise<{ data: Hero[] }> => {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/heroes`);
  if (!response.ok) {
    throw new Error("Failed to request heroes list");
  }
  return response.json();
};
