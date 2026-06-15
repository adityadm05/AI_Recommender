// Fixes applied:
// 1. Was calling /api/gemini (Vite proxy) — broken in production and used a discontinued endpoint
// 2. Request body used deprecated generateText format { prompt: { text } }
// 3. Response parsed as candidates[0].output — correct field is candidates[0].content.parts[0].text
// 4. No guard for missing API key
// Now calls Gemini API directly from the browser using VITE_GEMINI_API_KEY

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// gemini-2.5-flash — current free tier model (10 RPM, 250 RPD). gemini-1.5 is deprecated, gemini-2.0 removed in many regions
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function getRecommendations(products, userPreference) {
  if (!API_KEY) {
    throw new Error(
      "Missing API key. Add VITE_GEMINI_API_KEY to your .env file and restart the dev server."
    );
  }

  const productList = products
    .map(
      (p) =>
        `• ${p.name} (${p.category}) — $${p.price}\n  ${p.description}\n  Features: ${p.features.join(", ")}`
    )
    .join("\n\n");

  const prompt = `You are a helpful product recommendation assistant.
Recommend only from the products provided — never suggest products outside this list.
Be concise, friendly, and explain exactly why each product fits the user's needs.
Format your response clearly with product names as headers.

Available products:\n\n${productList}\n\nUser preference: "${userPreference}"\n\nRecommend the 1–3 best matches and briefly explain why each fits.`;

  let response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Fixed: correct generateContent request body (not the old generateText format)
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
          topP: 0.95,
        },
      }),
    });
  } catch (err) {
    throw new Error(`Network error: ${err.message}`);
  }

  const data = await response.json();

  // Surface API-level errors (invalid key, quota exceeded, etc.)
  if (data.error) {
    throw new Error(data.error.message || `Gemini API error: ${response.status}`);
  }

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  // Fixed: correct response path for generateContent API
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No response from Gemini. Please try again.");
  return text.trim();
}
