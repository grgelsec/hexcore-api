import express, { type Request, type Response } from "express";
import "dotenv/config";
import type { AccountDto } from "@types";
import { getAccountByRiotId } from "@services/riot";

export const getPlayerId = async (req: Request, res: Response) => {
  try {
    const riotId: string = req.params.riotId as string;

    if (!riotId) {
      return res.status(400).json({
        success: false,
        error: "Username is required.",
      });
    }
    const data: AccountDto = await getAccountByRiotId(riotId);

    if (!data) {
      return res.status(400).json({
        success: false,
        error: "No response from riot service.",
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
