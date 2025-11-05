# VyuGo Travel API

TypeScript + Express backend that powers the VyuGo travel experience. It mirrors the mock data structures used by the frontend and exposes REST endpoints for flights, hotels, buses, holidays, and authentication.

## Prerequisites

- Node.js 18+
- PostgreSQL 14+

## Setup

```bash
cp .env.example .env
# update DATABASE_URL and JWT_SECRET
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
```

## Development

```bash
npm run dev
```

The server listens on `http://127.0.0.1:4000` by default and includes a `/health` probe.

## Testing & Linting

```bash
npm run test
npm run lint
```

## API Overview

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| POST | `/flights/search` | Search flights with filters and metadata |
| GET | `/flights/:id` | Retrieve a flight by id |
| POST | `/hotels/search` | Search hotels |
| GET | `/hotels/:id` | Retrieve hotel details |
| POST | `/buses/search` | Search bus routes |
| GET | `/buses/:id` | Retrieve a bus route |
| POST | `/holidays/search` | Search holiday packages |
| GET | `/holidays/:id` | Retrieve a holiday package |
| POST | `/auth/login` | Traveler login |
| POST | `/auth/signup` | Traveler sign up |
| POST | `/auth/logout` | Logout (stateless) |
| POST | `/auth/admin/login` | Admin login |

Set `VITE_API_BASE_URL=http://127.0.0.1:4000` and `VITE_USE_MOCKS=false` in the frontend to consume these endpoints.
