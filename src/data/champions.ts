import type { Champion, ChampionData } from "@types";

let champions: Record<string, Champion> | null = null;

export const getChampionId = async (championName: string): Promise<number> => {
  if (!champions) {
    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/14.1.1/data/en_US/champion.json`,
    );
    const data: ChampionData = await res.json();
    champions = data.data;
  }

  const championId = parseInt(champions[championName]?.key as string);

  return championId;
};
