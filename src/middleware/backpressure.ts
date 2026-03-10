import type { NextFunction, Request, Response } from "express";

let activeRequests = 0;
const MAX_ACTIVE = 100;

export const backpressure = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (activeRequests > MAX_ACTIVE) {
    return res.status(503).json({
      success: false,
      error: "Server busy, try again later.",
    });
  }

  activeRequests++;

  res.on("finish", () => {
    activeRequests--;
  });

  next();
};
