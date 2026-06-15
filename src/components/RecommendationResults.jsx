export default function RecommendationResults({ result, loading, error }) {
  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-surface/60 p-8 backdrop-blur-md">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-t-primary" />
        </div>
        <div className="text-center">
          <p className="font-medium text-on-surface">Analyzing your preferences...</p>
          <p className="mt-1 text-sm text-on-surface-variant">Our engine is finding the best matches</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-2xl border border-error/30 bg-error/10 p-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 text-xl text-error">⚠</span>
          <div>
            <p className="font-semibold text-error">Something went wrong</p>
            <p className="mt-1 text-sm text-error/80">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Result state
  if (result) {
    return (
      <div className="rounded-2xl border border-primary/20 bg-surface/60 p-6 backdrop-blur-md">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-lg text-primary">✦</span>
          <h2 className="text-lg font-semibold text-on-surface">AI Recommendations</h2>
          <span className="ml-auto rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-on-surface-variant">
            Optimized
          </span>
        </div>

        {/* Render each line from the AI response */}
        <div className="space-y-2">
          {result.split("\n").map((line, i) => {
            if (!line.trim()) return <div key={i} className="h-3" />;

            // Detect product name lines (lines starting with • or ** or a number)
            const isBold =
              line.startsWith("**") ||
              line.startsWith("##") ||
              /^\d+\./.test(line) ||
              (line.endsWith(":") && line.length < 60);

            const cleanLine = line
              .replace(/^\*\*|\*\*$/g, "")
              .replace(/^##\s*/, "")
              .replace(/^\*\s/, "");

            return isBold ? (
              <p key={i} className="mt-4 font-semibold text-primary">
                {cleanLine}
              </p>
            ) : (
              <p key={i} className="text-sm leading-relaxed text-on-surface-variant">
                {cleanLine}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  // Empty / initial state
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-surface/60 p-8 text-center backdrop-blur-md">
      <span className="text-4xl opacity-30">🤖</span>
      <p className="text-sm text-on-surface-variant">
        Enter your preference above and get instant AI-powered product recommendations.
      </p>
    </div>
  );
}
