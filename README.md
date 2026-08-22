# Sports Auction

Full-stack application for running live sports/cricket player auction drafts. A React frontend drives the auction UI while an Express + MongoDB backend stores teams, player pools, and draft state.

## Architecture

```
┌─────────────────┐     HTTP (REST)      ┌──────────────────┐
│  React frontend │  ─────────────────►  │  Express backend │
│  localhost:3000 │  ◄─────────────────  │  localhost:8080  │
└─────────────────┘     JSON payloads    └────────┬─────────┘
                                                  │
                                                  ▼
                                         ┌──────────────────┐
                                         │     MongoDB      │
                                         └──────────────────┘
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [MongoDB](https://www.mongodb.com/) 6+ (local instance or Atlas)
- npm

## Quick Start

### 1. Clone and install

```bash
git clone <repo-url>
cd Sports-Auction-Backend
npm run install:all
```

Or install each package separately:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 2. Configure environment

**Backend** — copy and edit `backend/.env.example`:

```bash
cp backend/.env.example backend/.env
```

**Frontend** — copy and edit `frontend/.env.example`:

```bash
cp frontend/.env.example frontend/.env.local
```

Set `REACT_APP_API_BASE_URL=http://localhost:8080` so the React dev server can reach the API.

### 3. Start MongoDB

Ensure MongoDB is running locally, or set `MONGODB_URI` in `backend/.env` to your Atlas connection string.

### 4. Seed sample data (optional)

```bash
npm run seed
```

### 5. Run both apps

In separate terminals from the repo root:

```bash
npm run dev:backend    # API on http://localhost:8080
npm run dev:frontend   # UI on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
.
├── backend/                 # Express + MongoDB REST API
│   ├── src/
│   │   ├── server.js        # Entry point
│   │   ├── config/          # Environment config
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # Route handlers
│   │   ├── services/        # Business logic
│   │   └── middleware/      # Auth, error handling
│   ├── data/seed/           # Sample JSON for seeding
│   ├── scripts/seed.js      # Database seed script
│   └── package.json
├── frontend/                # Create React App UI
│   ├── src/
│   │   ├── api/             # Axios client (REACT_APP_API_BASE_URL)
│   │   └── components/      # Auction screens
│   ├── public/
│   └── package.json
├── package.json             # Root convenience scripts
└── README.md
```

## Backend API

| Method | Path              | Auth | Description                         |
| ------ | ----------------- | ---- | ----------------------------------- |
| GET    | `/teams`          | No   | List all teams                      |
| POST   | `/teams`          | Yes* | Replace all teams                   |
| GET    | `/players`        | No   | List main-pool players              |
| POST   | `/players`        | Yes* | Replace all main-pool players       |
| GET    | `/random-players` | No   | List random-pool players            |
| POST   | `/random-players` | Yes* | Replace all random-pool players     |

\* Required only when `API_KEY` is set in `backend/.env`.

**GET** responses: `{ "data": [ ... ] }`

**POST** body: `{ "data": [ ... ] }` — replaces the entire collection.

See [backend/README.md](backend/README.md) for data schemas and seed details.

## Environment Variables

### Backend (`backend/.env`)

| Variable         | Required | Default                                      | Description                              |
| ---------------- | -------- | -------------------------------------------- | ---------------------------------------- |
| `PORT`           | No       | `8080`                                       | API server port                          |
| `MONGODB_URI`    | No       | `mongodb://localhost:27017/sports-auction` | MongoDB connection string                |
| `API_KEY`        | No       | —                                            | Secret for POST endpoints (optional)     |
| `ALLOWED_ORIGIN` | No       | `http://localhost:3000`                    | CORS origin for browser requests         |

When `API_KEY` is set, POST requests must send `x-api-key: <key>` or `Authorization: Bearer <key>`. The frontend does not currently send an API key; leave `API_KEY` unset for local development, or add the header in `frontend/src/api/index.jsx` for production.

### Frontend (`frontend/.env.local`)

| Variable                  | Required | Default | Description                          |
| ------------------------- | -------- | ------- | ------------------------------------ |
| `REACT_APP_API_BASE_URL`  | Yes*     | —       | Backend base URL, e.g. `http://localhost:8080` |

\* Required when frontend and backend run on different origins (typical local dev).

Variables prefixed with `REACT_APP_` are embedded in the public JS bundle at build time — never put secrets here.

## Frontend Development

```bash
cd frontend
npm start          # Dev server with hot reload
npm run build      # Production build to frontend/build/
npm test           # Jest test runner
```

The API client lives in `frontend/src/api/index.jsx` and reads `REACT_APP_API_BASE_URL`.

If deploying the static build separately from the API, update `public/_headers` CSP `connect-src` to include the API origin.

## Deployment Notes

- **Backend**: Deploy as a Node process (Railway, Render, EC2, etc.). Set `MONGODB_URI`, `ALLOWED_ORIGIN` (your frontend URL), and optionally `API_KEY`.
- **Frontend**: Build with `npm run build:frontend`, then serve `frontend/build/` from any static host (Netlify, Cloudflare Pages, S3 + CloudFront).
- **Same-origin**: For production, a reverse proxy can serve the React build and proxy `/teams`, `/players`, etc. to the API — then leave `REACT_APP_API_BASE_URL` empty.
- Set `ALLOWED_ORIGIN` to match your deployed frontend URL for CORS.

## Root Scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run install:all`   | Install backend + frontend deps  |
| `npm run dev:backend`   | Start API with nodemon           |
| `npm run dev:frontend`  | Start React dev server           |
| `npm run start:backend` | Start API (production mode)      |
| `npm run build:frontend`| Build React for production       |
| `npm run seed`          | Load sample data into MongoDB    |
