// Fix: replaced `if (ref) { ref.current = … }` with useImperativeHandle
// The original pattern mutated ref.current on every render, which could cause
// stale closures and is not the intended API for forwardRef.
// useImperativeHandle is the correct React pattern for exposing imperative methods.

import { useState, useRef, forwardRef, useImperativeHandle } from "react";

const EXAMPLES = [
  "I want a phone under $500",
  "Best device for students on a budget",
  "I need something for music with great sound quality",
  "Laptop for creative work, price no issue",
];

const RecommendationForm = forwardRef(({ onSubmit, loading }, ref) => {
  const [preference, setPreference] = useState("");
  const inputRef = useRef(null);

  // Fixed: proper imperative handle pattern
  useImperativeHandle(ref, () => ({
    clearInput: () => setPreference(""),
    focusInput: () => inputRef.current?.focus(),
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = preference.trim();
    if (trimmed && !loading) {
      onSubmit(trimmed);
    }
  };

  const handleExample = (example) => {
    setPreference(example);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className="bg-surface/60 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <h2 className="text-on-surface font-semibold text-lg mb-1">What are you looking for?</h2>
      <p className="text-on-surface-variant text-sm mb-4">
        Describe your needs and our AI will match you with the best product.
      </p>

      {/* Example prompts */}
      <div className="flex flex-wrap gap-2 mb-4">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => handleExample(ex)}
            className="text-xs text-primary border border-primary/30 bg-primary/10 hover:bg-primary/20 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {ex}
          </button>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          ref={inputRef}
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="e.g. I want a phone under $500..."
          disabled={loading}
          className="flex-1 bg-surface-container-lowest border border-white/10 text-on-surface placeholder:text-on-surface-variant/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:bg-surface-container transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!preference.trim() || loading}
          className="btn-gradient text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Thinking..." : "✦ Get Recommendations"}
        </button>
      </form>
    </div>
  );
});

RecommendationForm.displayName = "RecommendationForm";
export default RecommendationForm;
