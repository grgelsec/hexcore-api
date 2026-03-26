import { BadRequestError, NotFoundError } from "@error";
import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";
import { redis } from "@redis";
import * as crypto from "node:crypto";

interface matchesResult {
  data: RiotParticipantDto[];
  isFromCache: boolean;
}
const getParamHashKey = (requestParameter: string) => {
  let retKey = "";
  if (requestParameter) {
    retKey = crypto.createHash("sha256").update(requestParameter).digest("hex");
  }

  return "CACHE_ASIDE_" + retKey;
};

export const getRecentMatches = async (req: Request, res: Response) => {
  let result: matchesResult = { data: [], isFromCache: false };

  const riotId = req.params.riotId as string;
  const count = Math.min(parseInt(req.params.count as string) || 20, 20);

  if (!riotId) throw new BadRequestError("Riot ID is required");

  const hashkey = getParamHashKey(riotId);
  const cachedData = await redis.get(hashkey);
  const docArr = cachedData ? JSON.parse(cachedData) : [];

  if (docArr && docArr.length) {
    result.data = docArr;
    result.isFromCache = true;
  } else {
    const recentMatches: RiotParticipantDto[] = await returnRecentMatches(
      riotId,
      count,
    );

    if (!recentMatches) throw new NotFoundError("Recent matches not found");

    if (recentMatches && recentMatches.length) {
      redis.set(hashkey, JSON.stringify(recentMatches), "EX", 60);
    }

    result.data = recentMatches;
  }

  return res.json(result);
};
