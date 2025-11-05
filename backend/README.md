# VyuGo Travel API

TypeScript + Express backend that powers the VyuGo travel experience. It mirrors the mock data structures used by the frontend and exposes REST endpoints for flights, hotels, buses, holidays, and authentication.

## Prerequisites

- Node.js 18+
- MySQL 8.0+ (local instance or hosted service)

## Setup

```bash
cp .env.example .env
# update DATABASE_URL and JWT_SECRET
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run db:seed
```

### Using the hosted MySQL database

To work with the credentials you shared (`srv1192.hstgr.io`, database `u544699864_food`), update `.env` with a connection string such as:

```
DATABASE_URL="mysql://u544699864_food:<password>@srv1192.hstgr.io:3306/u544699864_food"
```

Then apply the schema and seed data directly to the remote database:

```bash
npm run prisma:migrate:deploy
npm run db:seed
```

> **Note**: Running the seed script multiple times will clear and repopulate the tables to keep the data consistent with the frontend expectations.

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
