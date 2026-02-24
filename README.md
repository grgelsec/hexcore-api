Week 1-2: HTTP Fundamentals
✓ Project setup (Express + TypeScript + PostgreSQL)
✓ Database schema (players, matches, teams, bans, match_participants)
✓ Riot service (account, summoner, match endpoints)
✓ Sync service (fetch from Riot, store in DB)
✓ Insert queries (all tables)
✓ Timeouts: AbortSignal.timeout(5000)
✓ Retry logic with exponential backoff
✓ Basic error handling
✓ Rate limiting middleware (fixed window)

Week 2: Core Endpoints
□ Read queries:

- getMatchesByPuuid(puuid)
- getParticipantsByPuuid(puuid)
- getBansByChampion(championId)
  □ Endpoints:
- GET /api/v1/player/:riotId/matches (sync + return matches)
- GET /api/v1/player/:riotId/stats (win rate, KDA from stored data)
- GET /api/v1/champions/:championId/banrate
  □ API versioning (/api/v1/)
  □ Backpressure (reject when overloaded)

Week 3: Caching + Redis
□ Redis setup on Railway
□ Cache-aside pattern
□ TTL strategies (summoner 24hr, matches 6hr, stats 1hr)
□ Cache invalidation on new data

Week 4: Production Prep
□ Deploy to Railway
□ Health check endpoint
□ Structured logging
□ Basic metrics (response times, cache hit rates)
□ API documentation
