import { Router } from "express";
import { playerId } from "@controllers";

//TODO: think of better naming for the routes

export const summonerRouter = Router();

summonerRouter.post("/username", playerId);
