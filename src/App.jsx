import { useState, useRef } from "react";
import products from "./data/products";
import { getRecommendations } from "./services/gemini";
import ProductCard from "./components/ProductCard";
import RecommendationForm from "./components/RecommendationForm";
import RecommendationResults from "./components/RecommendationResults";

export default function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef(null);

  const handleRecommend = async (preference) => {
    setLoading(true);
    setError("");
    setResult("");

    try {
      const recommendation = await getRecommendations(products, preference);
      setResult(recommendation);
      // Clear form input after successful recommendation
      formRef.current?.clearInput();
    } catch (err) {
      setError(err?.message || "Something went wrong while fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary/30">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-secondary-container/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10">
        <header className="glass-panel sticky top-0 z-50 border-b border-white/10 shadow-[0_0_40px_rgba(192,193,255,0.1)]">
          <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-5 md:px-margin-desktop">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                magic_button
              </span>
              <div>
                <p className="font-display-lg text-headline-md tracking-tighter text-primary">Find AI</p>
                <p className="text-xs text-on-surface-variant">Instant product recommendations</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <a className="text-on-surface-variant hover:text-primary transition" href="#">Features</a>
              <a className="text-on-surface-variant hover:text-primary transition" href="#">How it Works</a>
              <a className="text-on-surface-variant hover:text-primary transition" href="#">Pricing</a>
            </nav>
            <button className="hidden rounded-lg border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition hover:bg-primary/20 md:inline-flex">
              Get Started
            </button>
          </div>
        </header>

        <main className="relative mx-auto w-full max-w-container-max px-margin-mobile pb-section-gap pt-10 md:px-margin-desktop">
          <section className="relative mb-16 rounded-[2rem] border border-white/10 bg-surface/80 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-14">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-primary">
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  Engineered for Precision
                </span>
                <h1 className="mt-8 text-4xl font-semibold leading-tight text-on-surface md:text-5xl">
                  Find Products Using <span className="text-gradient">AI</span>
                </h1>
                <p className="mt-6 max-w-xl text-base text-on-surface-variant">
                  Describe your needs and our engine will return the best matching products from our curated catalog.
                </p>
              </div>
              <div className="w-full max-w-xl">
                <RecommendationForm ref={formRef} onSubmit={handleRecommend} loading={loading} />
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-6">
              <RecommendationResults result={result} loading={loading} error={error} />

              <div className="rounded-[2rem] border border-white/10 bg-surface/80 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.16)]">
                <p className="text-sm uppercase tracking-[0.24em] text-on-surface-variant">Trending Prompts</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {[
                    "I want a phone under $500",
                    "Best device for students on a budget",
                    "Laptop for creative work",
                    "Headphones with excellent noise cancellation",
                  ].map((item) => (
                    <button
                      key={item}
                      onClick={() => handleRecommend(item)}
                      disabled={loading}
                      className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-on-surface-variant transition hover:border-primary/60 hover:bg-primary/20 disabled:opacity-50"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-[2rem] border border-white/10 bg-surface/80 p-8 shadow-[0_40px_80px_rgba(0,0,0,0.16)]">
              <h2 className="text-xl font-semibold text-on-surface">Why Choose AI?</h2>
              <p className="mt-4 text-sm leading-7 text-on-surface-variant">
                This app requires a valid Gemini API key and uses Gemini to select the best matches from the catalog.
              </p>
              <ul className="mt-6 space-y-4 text-sm text-on-surface-variant">
                <li className="flex gap-3">
                  <span className="mt-1 text-primary">•</span>
                  AI-first recommendations via Gemini
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-primary">•</span>
                  Clean, curated product catalog
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-primary">•</span>
                  Requires a valid Gemini API key
                </li>
              </ul>
            </aside>
          </section>

          <section className="mt-16">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Product Collection</p>
                <h2 className="mt-3 text-3xl font-semibold text-on-surface">Top products from our catalog</h2>
              </div>
              <button className="hidden rounded-full border border-white/10 bg-primary/10 px-6 py-3 text-sm text-primary transition hover:bg-primary/20 md:inline-flex">
                View All Categories
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-surface-container-lowest py-12">
          <div className="mx-auto flex w-full max-w-container-max flex-col gap-8 px-margin-mobile md:px-margin-desktop md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xl font-semibold text-on-surface">FInd AI</p>
              <p className="text-sm text-on-surface-variant">Computational elegance for modern commerce. Let AI find exactly what you need.</p>
            </div>
            <p className="text-sm text-on-surface-variant">© 2026 AI Product Recommender.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
