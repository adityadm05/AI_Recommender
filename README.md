# ✦ AI Product Recommender

![App screenshot](public/screenshot.png)

A lightweight, attractive demo that uses a small static product dataset and the Gemini generative model to return concise, explainable product matches based on natural-language prompts.

---

**Highlights**

- Modern React + Vite developer experience
- Beautiful Tailwind UI with dark mode + glassmorphism
- Natural-language recommendations from Google Gemini
- No server required for the demo (see security notes below)

---

**Quick Links**

- Live entry: [index.html](index.html)
- Main app entry: [src/main.jsx](src/main.jsx#L1)
- Recommendation service: [src/services/gemini.js](src/services/gemini.js#L1)
- Form component: [src/components/RecommendationForm.jsx](src/components/RecommendationForm.jsx#L1)

---

## Quick Start

Prerequisites: Node 18+ and npm (or pnpm/yarn).

1. Install dependencies

```bash
npm install
```

2. Create a `.env` in the project root and add your Gemini key:

```env
# Vite exposes variables starting with VITE_ to the browser
VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

3. Start dev server

```bash
npm run dev
```

Open the app at http://localhost:5173

Other scripts (from `package.json`):

```bash
npm run build   # create production build
npm run preview # preview production build locally
npm run lint    # run ESLint
```

---

## What changed / Compatibility notes

- The app now requires the environment variable `VITE_GEMINI_API_KEY` (see `.env`).
- `src/services/gemini.js` calls the Gemini `generateContent` endpoint directly and expects the `candidates[0].content.parts[0].text` response path.
- The code uses the `gemini-2.5-flash` model surface by default in `gemini.js` (this is configured in the request URL inside the file).

If you previously set `GEMINI_API_KEY` the app will not find it; rename it to `VITE_GEMINI_API_KEY` and restart the dev server.

---

## How It Works (short)

1. The UI provides a small static product dataset (`src/data/products.js`).
2. User enters a free-text preference in the `RecommendationForm` component.
3. `getRecommendations(products, preference)` in `src/services/gemini.js` builds a single prompt containing the product list and the user preference and sends it to Gemini.
4. Gemini returns a short, human-readable recommendation string which the app renders in `RecommendationResults` with loading and error states handled gracefully.

---

## Security & Production

- This demo calls Gemini directly from the browser using `VITE_GEMINI_API_KEY`. That means the key is visible to end users and is only appropriate for local demos or controlled assessments.
- For production, move requests to a backend proxy that stores the API key server-side and enforces rate limits and authentication.

Where to get a key: https://developers.generativeai.google/

---

## Project Structure (short)

```
src/
├─ components/
│  ├─ ProductCard.jsx
│  ├─ RecommendationForm.jsx
│  └─ RecommendationResults.jsx
├─ data/
│  └─ products.js
├─ services/
│  └─ gemini.js
├─ App.jsx
└─ main.jsx
```

---

## Contributing

- Open an issue or create a PR. Keep changes small and focused.
- If adding new models or endpoints, update `README.md` and environment docs.

---

If you'd like, I can also:

- Add a small screenshot or GIF to the README
- Create a `.env.example` file and update `.gitignore`
- Add a short CI workflow to validate builds

Happy to make those next — want me to add a `.env.example` now?
