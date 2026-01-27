import "dotenv/config";
import type { AccountDto, region } from "@types";
class RiotService {
  private apiKey: string;
  private region: string;
  public account: AccountService;

  constructor(apiKey: string, region: string) {
    if (!apiKey) {
      throw new Error("RIOT_API_KEY is not set.");
    }

    this.apiKey = apiKey;
    this.region = region;

    this.account = new AccountService(this.request.bind(this));
  }

  private get baseURL(): string {
    return `https://${this.region}.api.riotgames.com`;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      headers: { "XS-Riot-Token": this.apiKey },
    });

    if (!res.ok) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }

    const data = await res.json();
    console.log(data);
    return data;
  }
}

class AccountService {
  private request: <T>(endpoint: string) => Promise<T>;

  constructor(request: <T>(endpoint: string) => Promise<T>) {
    this.request = request;
  }

  async getSummonerByPuuid(puuid: string) {
    if (!puuid) {
      throw new Error(`Missing player unique user id (puuid).`);
    }

    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-puuid/${encodeURIComponent(puuid)}`,
    );
  }

  async getSummonerByRiotId(riotId: string) {
    if (!riotId || !riotId.includes("#")) {
      throw new Error(`RiotId not in correct format.`);
    }

    const [name, tag] = riotId.split("#");

    if (!name || !tag) {
      throw new Error("invalid RiotId");
    }
    console.log(name, tag);

    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tag)}`,
    );
  }
}

// const RIOT_API_KEY = process.env.RIOT_API_KEY;

// const leage = new RiotService(RIOT_API_KEY!, "americas");

// leage.getSummonerByRiotId("Georgie#EZLL");
// leage.getSummonerByPuuid(
//   "UPDmamHMSP2-38FGcerju-z3mBbI2Z6Ti0-64gwd9P6vJ7OyEuN0vpXrXMeDOJNGrGlJY-9hte98Mw",
// );
