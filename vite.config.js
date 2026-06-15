// Fixes applied:
// 1. Removed the /api/gemini proxy entirely — it was the root cause of the API not working
//    because it targeted v1beta2/:generateText (discontinued endpoint)
//    and used "gemini-1.5" which is not a valid model name
// 2. The proxy also only worked during `npm run dev`, silently breaking production builds
// 3. Now the app calls the Gemini API directly from gemini.js using VITE_GEMINI_API_KEY

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
