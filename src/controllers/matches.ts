import { returnRecentMatches } from "@services/hexcore";
import type { RiotParticipantDto } from "@types";
import type { Request, Response } from "express";

export const recentMatches = async (req: Request, res: Response) => {
  try {
    console.log("hit recentMatches", req.params);
    const riotId = req.params.riotId as string;
    const count = Math.min(parseInt(req.query.count as string) || 20, 20);

    if (!riotId) {
      return res.status(400).json({
        success: false,
        error: "RiotID is required.",
      });
    }

    const data: RiotParticipantDto[] = await returnRecentMatches(riotId, count);

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "Return recent matches call failed.",
      });
    }

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown Error",
    });
  }
};
