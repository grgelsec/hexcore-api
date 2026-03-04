import type { Request, Response } from "express";
import { championBanRate } from "../services/hexcore/champions.js";
import { success } from "zod/mini";

export const getChampionBanRate = async (res: Response, req: Request) => {
  try {
    const champion = req.params.champion as string;

    if (!champion) {
      return res.status(400).json({
        success: false,
        message: "Champion input required.",
      });
    }

    const data = championBanRate(champion);

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Missing ban rate",
      });
    }

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unkown Error",
    });
  }
};
