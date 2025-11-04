# Connecting VS Code to ChatGPT / OpenAI

This document explains safe, local steps to connect VS Code to ChatGPT-like tools using either a marketplace extension or the OpenAI API.

Options
- Install a VS Code ChatGPT/OpenAI extension (recommended for editor-integrated chats).
- Use the OpenAI API from a local script (recommended for automation or custom prompts).

1) Install an extension in VS Code

- Open VS Code and go to the Extensions view (Ctrl+Shift+X).
- Search for terms: `ChatGPT`, `OpenAI`, `CodeGPT`, or `Copilot`.
- Pick a well-reviewed extension (check publisher and reviews) and click Install.
- After installation, follow the extension's instructions to authenticate. Many extensions support two flows:
  - Browser-based OAuth sign-in (opens GitHub/OpenAI login in browser), or
  - Supplying an API key (set in extension settings or environment variables).

2) Use the OpenAI API from this project (Node example)

- Create an OpenAI API key at https://platform.openai.com/account/api-keys.
- Save the key in your local `.env` (don't commit it). Use the `.env.example` in this repo as a template.
- Example usage (Node): see `ai-scripts/generate.js` (not included) — you can create a small script to call the API.

3) VS Code settings (local)

Create or update the workspace `.vscode/settings.json` to store extension-specific settings locally. Example keys (replace with extension's actual keys):

```
{
  // Example placeholder — do NOT commit real API keys to the repo
  "openai.apiKey": "${env:OPENAI_API_KEY}",
  "chatgpt.enable": true
}
```

4) Security notes

- Never commit real API keys or tokens. Use `.gitignore` (this repo already ignores `.env`).
- Prefer browser OAuth flows for editor extensions when available — they are more secure than embedding tokens in files.

If you want, I can:
- Create a small Node script under `ai-scripts/` that calls the OpenAI API (you'll need to add your API key to `.env`).
- Suggest specific VS Code extension IDs and add a workspace `extensions.json` to recommend them.

Tell me which you prefer and I'll implement the next step.

---

Using the included Node script

1) Install the new dependencies:

```powershell
npm install
```

2) Create a `.env` file from the template and add your OpenAI API key:

```powershell
copy .env.example .env
# then edit .env and set OPENAI_API_KEY
```

3) Run the helper to ask about a file (example):

```powershell
npm run ai:ask -- src/App.jsx "Please review this component and suggest improvements"
```

The script reads the file, sends it to the OpenAI chat endpoint, and prints the assistant's response.

Security reminder: never commit `.env` or your API key.
