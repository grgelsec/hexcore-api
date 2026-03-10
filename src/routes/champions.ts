import { Router } from "express";
import { getChampionBanRate } from "@controllers";

export const championsRouter = Router();

championsRouter.get("/champions/:championName/banrate", getChampionBanRate);
