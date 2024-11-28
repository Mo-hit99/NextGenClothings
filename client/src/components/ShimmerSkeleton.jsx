export default function ShimmerSkeleton({cards}) {
  return (
    <div className="skeleton-main-container-form">
      <div className="skeleton-productCard-container">
        {Array.from({ length: cards }).map((_, idx) => (
          <div key={idx} className="skeleton-product-card shimmer"></div>
        ))}
      </div>
      <div className="skeleton-filter-container">
        <div className="skeleton-filter-heading shimmer"></div>
        <div className="skeleton-filter-checkbox shimmer"></div>
        <div className="skeleton-filter-checkbox shimmer"></div>
      </div>
    </div>
  )
}
