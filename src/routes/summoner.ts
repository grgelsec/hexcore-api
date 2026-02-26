import { Router } from "express";
import { playerId } from "@controllers";

export const summonerRouter = Router();

summonerRouter.post("/username", playerId);
