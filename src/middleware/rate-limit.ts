import type { NextFunction, Request, Response } from "express";
import { redis } from "@redis";
//TODO: Re-implment with sliding window

export interface SlidingWindowCounterConfig {
  maxRequests: number;
  windowSeconds: number;
}

export const DEFAULT_CONFIG: SlidingWindowCounterConfig = {
  maxRequests: 10,
  windowSeconds: 10,
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number; // requests left in the current window
  limit: number; // configured maximum
  retryAfter: number | null; // seconds untilt he client should retry
  delay?: number | null;
}

export const slidingWindow = async (key: string, config: SlidingWindowCounterConfig = DEFAULT_CONFIG): Promise<RateLimitResult> {
  const { maxRequests, windowSeconds } = config;

  const now = Math.floor(Date.now() / 1000);
  const currentWindow = Math.floor(now / windowSeconds);
  const previousWindow = currentWindow - 1;

  const currKey = `${key}:${currentWindow}`;
  const prevKey = `${key}:${currentWindow}`;

  const elapsed = (now % windowSeconds) / windowSeconds;

}


//Rate-Limit constants
const maxRequests = 5;
const windowSize = 20000;

//Tracking
let requestCount = 0;
let lastRequestTime = 0;

//Rate limiting with fixed window, currWindow calculated on each request. If maxRequests is hit while window size is small, error is thrown.
export const rateLimit = (req: Request, res: Response, next: NextFunction) => {
  const requestTime = Date.now();
  const currWindow = requestTime - lastRequestTime;

  //Request passes through if requestInterval
  if (requestCount >= maxRequests && currWindow <= windowSize) {
    res.status(429).json({
      success: "false",
      error: "Rate limit exceeded",
    });
    return console.log("Rate limit exceeded!");
  }

  if (currWindow > windowSize) {
    requestCount = 0;
  }

  console.log("Request recieved!");
  requestCount += 1;
  lastRequestTime = requestTime;

  //TEST
  console.log(
    `Rate Limit Metrics: \n Request Count: ${requestCount} \n Request time: ${requestTime} \n Time From Last Request: ${currWindow}`,
  );

  next();
};
