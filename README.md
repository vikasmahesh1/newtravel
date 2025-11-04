# NewTravel — Multi-modal travel booking experience

NewTravel is a modern React application that showcases a multi-modal travel booking journey across flights, hotels, and buses. It combines shared UI patterns, centralized state management, mocked APIs, and accessibility-forward styling with Tailwind CSS.

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

The UI is designed to talk to a locally running backend during development. By default it expects
an API listening at `http://127.0.0.1:4000`, which can be overridden through environment
variables. When a backend is unavailable you can keep working with the built-in mock data layer—no
network connectivity is required.

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
| `VITE_USE_MOCKS` | Set to `false` to hit the local backend instead of mock data. |

If `VITE_USE_MOCKS=true` (the default), the app serves data from static JSON fixtures and does not
perform any HTTP requests. Setting the flag to `false` switches the data layer to the backend using
`VITE_API_BASE_URL`.

## Project structure

```
src/
├── App.jsx                   # Route configuration and layout binding
├── components/               # Shared UI components (layout, hero, cards, forms)
├── data/                     # Mock JSON payloads for flights, hotels, and buses
├── features/                 # Redux Toolkit slices for search and user session
├── pages/                    # Route pages (home, search flows, auth, profile)
├── services/                 # Mock API and authentication services
├── store/                    # Redux store setup and selectors
├── styles.css                # Tailwind entry point with design tokens
└── __tests__/                # React Testing Library suites
```

Key highlights:
- **Shared layout**: `Header`, `Footer`, and mobile `GlobalNav` ensure consistent navigation.
- **Reusable search forms**: Flights, hotels, and buses share interaction patterns and dispatch Redux actions.
- **Data services**: `services/mockApi.js` can serve static fixtures or forward requests to your local backend based on `VITE_USE_MOCKS`.
- **State management**: Redux Toolkit centralizes search criteria/results and user authentication state.
- **Accessibility & responsiveness**: Tailwind CSS powers a responsive layout with focus styles, semantic elements, and reduced motion-friendly animations.

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
