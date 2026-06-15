export default function ProductCard({ product }) {
  const { name, category, price, description, features, rating, icon } = product;
  const displayRating = typeof rating === "number" ? rating.toFixed(1) : rating || "4.5";

  return (
    <div className="group rounded-2xl border border-white/10 bg-surface-container/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:bg-surface-container hover:shadow-[0_10px_40px_rgba(192,193,255,0.1)]">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-sm font-semibold leading-tight text-on-surface">{name}</h3>
            <span className="text-xs font-medium text-primary/80">{category}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">${price}</p>
          <p className="text-xs text-secondary">★ {displayRating}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-xs leading-relaxed text-on-surface-variant">{description}</p>

      {/* Feature pills */}
      <div className="flex flex-wrap gap-1.5">
        {features.slice(0, 3).map((feature) => (
          <span
            key={feature}
            className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-xs text-primary"
          >
            {feature}
          </span>
        ))}
        {features.length > 3 && (
          <span className="px-2 py-0.5 text-xs text-on-surface-variant">
            +{features.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
}
