import { getChampionId } from "@data";
import { getChampionBanRate } from "@queries";

export const championBanRate = async (championName: string) => {
  if (!championName) throw new Error("Champion input required!");

  const championId = await getChampionId(championName);
  const banRate = await getChampionBanRate(championId);

  if (banRate == 0) {
    return "No ban rate for this champion.";
  }

  return banRate;
};

console.log(await championBanRate("Yasuo"));
