# Backend

Express + MongoDB REST API for the Sports Auction app.

See the [root README](../README.md) for full setup, environment variables, and API overview.

## Quick commands (from this directory)

```bash
npm install
cp .env.example .env
npm run seed    # optional sample data
npm run dev     # development with nodemon
npm start       # production
```

## Data schemas

### Team

```json
{
  "id": 1,
  "name": "Team Alpha",
  "pointsRemaining": 150,
  "playersRemaining": 12,
  "maxGold": 100,
  "minDiamond": 20,
  "minPlatinum": 30
}
```

### Player

```json
{
  "id": 1,
  "fullName": "Player One",
  "name": "P1",
  "points": 0,
  "allocated": 0,
  "teamId": 0,
  "role": "Batsman",
  "picture": "images/player1.png",
  "category": "Gold"
}
```

- `allocated`: `0` = unallocated, `1` = drop, `2` = allocated
- `teamId`: `0` when unassigned

Sample seed data: `data/seed/teams.sample.json`, `data/seed/players.sample.json`.
