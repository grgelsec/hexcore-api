import { getMissingMatchIds, getPuuidBySummonerName } from "@queries";
import { getMatchIdsByPuuid } from "@services/riot/match.js";
import { syncParticipants } from "@services/sync/matchSync.js";

export const returnMatches = async (riotid: string, count: number) => {
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
};

returnMatches("Georgie#EZLL", 20);
