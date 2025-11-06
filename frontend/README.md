# VyuGo Holidays — Multi-modal travel booking experience

VyuGo Holidays is a modern React application that showcases a multi-modal travel booking journey across flights, hotels, buses, and signature holiday packages. It combines shared UI patterns, centralized state management, live APIs, and accessibility-forward styling with Tailwind CSS.

## Getting started

### Prerequisites
- Node.js 18+ (Node 20 LTS recommended)
- npm 9+

### Installation
```bash
npm install
```

If you are working offline or behind a proxy, configure npm's registry prior to installation.

### Backend expectations

The UI is designed to talk to the production-ready backend that lives under
[`backend/`](backend/README.md). By default it expects an API listening at
`http://127.0.0.1:4000`, which can be overridden through environment variables. Start the backend
before running the Vite dev server so every search and detail page can resolve data directly from
the database.

The backend is implemented with Express, Prisma, and MySQL and can connect either to a local
instance or to the hosted database you shared. Follow the backend README to install dependencies,
configure the connection string, run database migrations, and start the server alongside the Vite
dev server.

### Running the development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the app. The dev server supports hot module replacement.

### Building for production
```bash
npm run build
npm run preview
```
`npm run preview` serves the optimized build locally. The generated files now use relative asset
paths, so you can also open `dist/index.html` directly when you need a quick, offline preview.

## Environment configuration

Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

| Variable | Purpose |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL for your locally running backend. Defaults to `http://127.0.0.1:4000`. |
| `VITE_AUTH_TOKEN` | Example token or API key for authenticated requests. |

All searches and detail pages call the backend directly. Ensure the API is reachable at
`VITE_API_BASE_URL` (the default `http://127.0.0.1:4000` works for local development) before
opening the frontend.

## Project structure

```
src/
├── App.jsx                   # Route configuration and layout binding
├── components/               # Shared UI components (layout, hero, cards, forms)
├── data/                     # Sample JSON payloads used for seeding and offline previews
├── features/                 # Redux Toolkit slices for search and user session
├── pages/                    # Route pages (home, search flows, auth, profile, company info)
├── services/                 # API client and authentication services
├── store/                    # Redux store setup and selectors
├── styles.css                # Tailwind entry point with design tokens
└── __tests__/                # React Testing Library suites
```

Key highlights:
- **Shared layout**: `Header`, `Footer`, and mobile `GlobalNav` ensure consistent navigation.
- **Reusable search forms**: Flights, hotels, buses, and holiday packages share interaction patterns and dispatch Redux actions.
- **Intuitive date picking**: A bespoke calendar popover enhances all search flows with tap-friendly, accessible date selection.
- **India-first datasets**: Seed data mirrors 100+ real-world Indian routes, stays, and packages for lifelike search results and is loaded straight into MySQL.
- **Data services**: `services/apiClient.js` centralizes every REST call to the backend, while `services/authService.js` forwards authentication flows using the same configuration.
- **State management**: Redux Toolkit centralizes search criteria/results (across all travel domains) and user authentication state.
- **Accessibility & responsiveness**: Tailwind CSS powers a responsive layout with focus styles, semantic elements, and reduced motion-friendly animations.

## API contract

The backend surfaces deterministic responses across every travel domain. The JSON envelope matches the schemas documented in [`src/data/contracts.js`](src/data/contracts.js), ensuring the frontend can render search results and detail pages without additional adapters:

```jsonc
{
  "schema": "vyugo.flights.search",
  "criteria": { "origin": "DEL", "destination": "CCU", "date": "2024-05-01", "passengers": 1, "cabin": "Economy" },
  "items": [
    {
      "id": "FL-IN-1001",
      "airline": "VyuGo Air",
      "from": "Delhi (DEL)",
      "to": "Kolkata (CCU)",
      "departure": "2024-05-01T01:00:00.000Z",
      "arrival": "2024-05-01T02:15:00.000Z",
      "price": 3250,
      "fareClass": "Economy Flex"
    }
  ],
  "meta": {
    "total": 120,
    "currency": "INR",
    "generatedAt": "2024-05-01T09:00:00.000Z",
    "priceRange": { "min": 2800, "max": 9330 }
  }
}
```

Each contract exposes:

- **`schema`** — a stable identifier (`vyugo.<domain>.search`) for your API routing or versioning.
- **`criteria`** — the request payload the Redux slice keeps in state.
- **`items`** — sample records used across the search listing and detail pages.
- **`meta`** — summary fields (totals, ranges, filters, generation timestamp) that power UI badges and analytics.

The Express services already emit the envelope above, so the React application consumes live data with no additional configuration.

## Contact & support

- **Head office**: 1st Floor, Cinema Rd, Opp. Satya Gowri Theatre, Suryanarayana Puram, Kakinada, Andhra Pradesh 533001
- **Hyderabad branch lounge**: Road No. 36, Jubilee Hills, Hyderabad, Telangana 500033
- **Concierge desk**: +91 90145 67890 · **Support**: [support@vyugo.in](mailto:support@vyugo.in)
- Explore the in-app [About](http://localhost:5173/about), [Contact](http://localhost:5173/contact), and [Cancellation Policy](http://localhost:5173/cancellation-policy) pages via the footer for detailed information and forms.

## Testing & quality

### Unit tests
```bash
npm test
```
Tests are run via Jest with React Testing Library. DOM matchers are configured in `setupTests.js`.

### Continuous integration
A GitHub Actions workflow (`.github/workflows/ci.yml`) installs dependencies, runs tests (`npm test`), and builds the production bundle on pushes and pull requests targeting `main` or `master`.

## Deployment

The production build (`npm run build`) outputs a static bundle in `dist/`. Deploy the folder to any static host (e.g., Netlify, Vercel, Cloudflare Pages). Environment variables referenced via `import.meta.env` must be provided at build time.

## Contribution guidelines

### Branch workflow

- The shared integration branch is **`development`**. Push changes with `git push origin HEAD:development` (or set your
  local branch's upstream to `origin/development`).
- Open pull requests against `development` unless your team agrees on a different target (e.g., release branches).
- Merge to `main` only through tested pull requests originating from `development`.

1. Fork and clone the repository.
2. Create a feature branch: `git checkout -b feature/my-enhancement`.
3. Install dependencies and run the development server (`npm run dev`).
4. Write tests for new logic and ensure `npm test` passes.
5. Build the project with `npm run build` before submitting a pull request.
6. Open a PR describing the changes, testing performed, and screenshots for UI updates.

## Roadmap

- Swap mock services with live APIs using the environment configuration.
- Extend itinerary management with calendar sync and notifications.
- Add payment flows and seat selection for transport modes.
- Expand automated test coverage (component snapshots, integration flows).

## Licensing

This project is provided for demonstration purposes. Adapt and reuse as needed within your organization.
