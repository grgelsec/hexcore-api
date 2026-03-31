import "dotenv/config";
import type { FetchOptions } from "@types";
import { validPlatformRegion } from "@utils";

export class RiotClient {
  private RIOT_API_KEY: string;
  private REGION: string;
  private BASE_URL: string;

  constructor(RIOT_API_KEY: string, REGION: string) {
    this.RIOT_API_KEY = RIOT_API_KEY;
    this.REGION = REGION || "americas";
    this.BASE_URL = `https://${this.REGION}.api.riotgames.com`;
  }

  async request<T>(endpoint: string, options: FetchOptions = {}) {
    const { timeout = 5000, retries = 2, ...fetchOptions } = options;

    let lastError: Error | null = null;

    if (options.region && validPlatformRegion(options.region)) {
      this.REGION = options.region;
      this.BASE_URL = `https://${this.REGION}.api.riotgames.com`;
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      try {
        const res = await fetch(`${this.BASE_URL}${endpoint}`, {
          ...fetchOptions,
          headers: {
            "X-Riot-Token": this.RIOT_API_KEY,
            ...fetchOptions.headers,
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status >= 400 && res.status < 500) {
            const body = await res.text();
            console.log(endpoint);
            throw new Error(
              `${res.status}, ${res.statusText} \n Body: ${body}`,
            );
          }
          throw new Error(`HTTP: ${res.status}`);
        }

        //Clear timrout timer, call succeeded
        clearTimeout(timeoutId);

        const data = (await res.json()) as T;

        return data;
      } catch (error) {
        //Ensure the error caught is an error, if not then
        lastError = error instanceof Error ? error : new Error(String(error));

        const isTimeout = lastError.name === "AbortError";
        const isServerError = !lastError.message.startsWith("HTTP 4");

        if ((isServerError || isTimeout) && attempt < retries) {
          //retry the call with exponential backoff
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, attempt)));
          continue;
        }
        break;
      }
    }
    throw lastError;
  }
}

/*
 - Dependency Injection
 - A object should recieve its dependencies rather than reach out to find them.
*/

export const riot = new RiotClient(process.env.RIOT_API_KEY!, "americas");
