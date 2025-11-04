# NewTravel (Vite + React)

Minimal, clean starter for the NewTravel UI. Includes a small demo, a helper script to send files to OpenAI, and workspace recommendations for AI extensions.

Quickstart (PowerShell)

```powershell
# 1) Install dependencies
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview production build
npm run preview
```

AI helper

This repo includes a small helper script that sends a file to OpenAI and prints the assistant response.

```powershell
copy .env.example .env
# edit .env and add OPENAI_API_KEY
npm run ai:ask -- src/App.jsx "Please review this component and suggest improvements"
```

Files of interest
- `package.json` — scripts, dependencies, and repository metadata
- `src/` — React source (App component, styles)
- `ai-scripts/ask.js` — helper to send a file to the OpenAI chat API
- `tools/ai/ask.js` — helper to send a file to the OpenAI chat API (moved to tools/ai)
- `.vscode/extensions.json` — recommended extensions for the workspace
- `.env.example` — template for your OpenAI key (do NOT commit real keys)

Notes
- The project uses Vite — dev server runs at http://localhost:5173 by default.
- `.env` is ignored by `.gitignore`; keep API keys out of the repo.
