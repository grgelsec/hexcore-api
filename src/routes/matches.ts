import { Router } from "express";
import { recentMatches } from "@controllers";

export const matchesRouter = Router();

matchesRouter.get("/:riotId/recent", recentMatches);
