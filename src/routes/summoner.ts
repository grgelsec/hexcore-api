import { Router } from "express";
import { getPlayerId } from "@controllers";

export const summonerRouter = Router();

summonerRouter.get("/summoner/:riotId", getPlayerId);
