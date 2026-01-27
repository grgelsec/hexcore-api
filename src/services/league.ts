import type { AccountDto } from "../types";

class LeagueClient {
  private apiKey: string;
  private region: string;

  constructor(apiKey: string, region: string) {
    this.apiKey = apiKey;
    this.region = region;
  }

  private get baseURL() {
    return `https://${this.region}.api.riotgames.com`;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseURL}${endpoint}`, {
      headers: { "X-Riot-Token": this.apiKey },
    });
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();

    return data;
  }

  async getAccountByRiotId(gameName: string): Promise<AccountDto> {
    return this.request<AccountDto>(
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(gameName)}`,
    );
  }
}
