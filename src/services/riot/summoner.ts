import { request } from "./client.js";
import type { SummonerDto } from "@types";

export async function getSummonerByPuuid(puuid: string) {
  if (!puuid) throw new Error("Missing player unique user id (puuid).");

  return request<SummonerDto>(
    `/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(puuid)}`,
  );
}

getSummonerByPuuid(
  "UPDmamHMSP2-38FGcerju-z3mBbI2Z6Ti0-64gwd9P6vJ7OyEuN0vpXrXMeDOJNGrGlJY-9hte98Mw",
);
