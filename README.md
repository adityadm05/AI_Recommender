# ✦ AI Product Recommender

An AI-powered product recommendation system built with React, Vite, Tailwind CSS, and the Gemini API.

---

## Tech Stack

- **React 18** + **Vite** — fast dev server, instant HMR
- **Tailwind CSS v3** — utility-first styling with dark mode + glassmorphism
- **Gemini API** (`gemini-1.5`) — natural language recommendations
- **No backend** — all API calls made directly from the browser

---

## Project Structure

```
src/
├── components/
│   ├── ProductCard.jsx          # Displays a single product
│   ├── RecommendationForm.jsx   # User preference input
│   └── RecommendationResults.jsx # Shows AI output, loading, errors
├── data/
│   └── products.js              # 5 predefined products
├── services/
│   └── gemini.js                # Gemini fetch wrapper
├── App.jsx                      # Root layout
├── main.jsx                     # React entry point
└── index.css                    # Tailwind directives
```

---

## ① Install & Setup

### Step 1 — Scaffold the project

```bash
npm create vite@latest ai-recommender -- --template react
cd ai-recommender
npm install
```

### Step 2 — Install Tailwind CSS

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### Step 3 — Copy source files

Replace the contents of the generated project with the files in this repo:

```bash
# After cloning/copying source files:
npm install   # install any remaining deps
```

---

## ② Environment Variables

Vite exposes env variables prefixed with `VITE_` to the browser.

Create a `.env` file in the project root and add your Gemini service key there.

```bash
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
```

> This app uses a local dev proxy to forward requests securely to Gemini. If the key is missing or invalid, recommendations will fail with a clear error message.
>
> **Where to get a key:** https://developers.generativeai.google/  
> ⚠️ This exposes your key in the browser. Fine for assessments/demos — use a backend proxy in production.

---

## ③ Run the App

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## ④ How It Works

1. **Products** are defined statically in `src/data/products.js`
2. User types a preference (e.g. *"I want a phone under $500"*)
3. `getRecommendations()` in `services/gemini.js` sends **both** the full product list and the user preference to Gemini
4. The AI recommends only products from the provided list
5. Results are displayed with loading and error handling

---

## ⑤ Git Workflow (Assessment Session)

Run these commits in order during your session. Each maps to a feature milestone.

---

### Commit 1 — Project scaffolding

```bash
git init
git add .
git commit -m "chore: init Vite + React project"
```
> Scaffold via `npm create vite`, install dependencies, confirm dev server runs.

---

### Commit 2 — Tailwind CSS setup

```bash
git add tailwind.config.js postcss.config.js src/index.css index.html
git commit -m "chore: add Tailwind CSS with dark mode config"
```
> Install Tailwind v3, configure `content` paths, add `@tailwind` directives, set `class="dark"` on `<html>`.

---

### Commit 3 — Product dataset

```bash
git add src/data/products.js
git commit -m "feat: add product dataset with 5 items"
```
> Define 5 products (smartphones, headphones, tablet, laptop) with name, price, features, and rating.

---

### Commit 4 — ProductCard component

```bash
git add src/components/ProductCard.jsx
git commit -m "feat: build ProductCard with glassmorphism styling"
```
> Glassmorphism card displaying product icon, name, category, price, rating, and feature pills.

---

### Commit 5 — RecommendationForm component

```bash
git add src/components/RecommendationForm.jsx
git commit -m "feat: add RecommendationForm with example prompts"
```
> Text input + submit button + clickable example preference chips.

---

### Commit 6 — Gemini API integration

```bash
git add src/services/gemini.js .env.example .gitignore
git commit -m "feat: integrate Gemini API for product recommendations"
```
> Fetch wrapper that sends product list + user preference to Gemini, handles API errors and missing key.

---

### Commit 7 — Wire up App.jsx

```bash
git add src/App.jsx src/main.jsx
git commit -m "feat: connect components in App with state management"
```
> `useState` for result/loading/error, `handleRecommend` async function wiring form → API → results.

---

### Commit 8 — Loading and error states

```bash
git add src/components/RecommendationResults.jsx
git commit -m "feat: add RecommendationResults with loading spinner and error handling"
```
> Animated spinner during API call, styled error card on failure, clean empty state with placeholder.

---

### Commit 9 — UI polish

```bash
git add src/App.jsx src/index.css
git commit -m "style: add gradient background blobs and header polish"
```
> Fixed gradient background blobs, gradient hero text, badge pill, two-column responsive layout.

---

### Commit 10 — Final cleanup

```bash
git add .
git commit -m "chore: final cleanup and code comments"
```
> Remove console.logs, add JSDoc-style inline comments, verify all edge cases work, check responsiveness.

---

## Features

- [x] 5 predefined products displayed in a grid
- [x] Natural language preference input
- [x] AI recommends only from the available product list
- [x] Loading spinner with animated ring
- [x] Error handling with descriptive messages
- [x] Example prompts for quick testing
- [x] Responsive layout (mobile + desktop)
- [x] Dark mode + glassmorphism design
- [x] No backend required
