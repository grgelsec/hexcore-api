import {
  getMissingMatchIds,
  getPastNGames,
  getPuuidBySummonerName,
} from "@queries";
import { getMatchIdsByPuuid } from "@services/riot";
import { syncParticipants } from "@services/sync";
import type { RiotParticipantDto } from "@types";

export const returnRecentMatches = async (
  riotid: string,
  count: number,
): Promise<RiotParticipantDto[]> => {
  if (!riotid) throw new Error("Missing riot id for returnMatches!");
  if (!count) count == 20;

  const puuid = await getPuuidBySummonerName(riotid);
  const matchIds = await getMatchIdsByPuuid(puuid);
  const missingMatchIds = await getMissingMatchIds(matchIds);

  if (missingMatchIds) {
    await Promise.all(
      missingMatchIds.map((matchId) => {
        syncParticipants(matchId);
      }),
    );
  }

  const recentParticipatedMatches = await getPastNGames(puuid, count);

  return recentParticipatedMatches;
};
