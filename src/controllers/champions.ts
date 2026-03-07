import type { Request, Response } from "express";
import { championBanRate } from "../services/hexcore/champions.js";

export const getChampionBanRate = async (req: Request, res: Response) => {
  try {
    const champion = req.params.championName as string;
    console.log(champion);

    if (!champion) {
      return res.status(400).json({
        success: false,
        message: "Champion input required.",
      });
    }

    const data = await championBanRate(champion);

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
