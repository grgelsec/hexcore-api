import type { Request, Response } from "express";

export const getChampionBanRate = async (res: Response, req: Request) => {
  try {
    const champion = req.params.champion as string;

    if (champion) {
      return res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : "Unkown Error",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Unkown Error",
    });
  }
};
