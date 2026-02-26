import {
  getMissingMatchIds,
  getPastNGames,
  getPuuidBySummonerName,
} from "@queries";
import { getMatchIdsByPuuid } from "@services/riot";
import { syncParticipants } from "@services/sync";

export const returnRecentMatches = async (riotid: string, count: number) => {
  /*
    1. Take in riot id and match count.
    2. Grab players last n matches.
    3. Check which matches are in db and seperate
    4. syncParticipants with matches not in DB
    5. return last n participants rows for matches gathered.
    */

  //WORK HARDER AND GO FASTER
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

  const recentMatches = await getPastNGames(puuid, count);

  console.log(recentMatches);

  return recentMatches;
};

//console.log(await returnRecentMatches("ohnoreason#7013", 3));
